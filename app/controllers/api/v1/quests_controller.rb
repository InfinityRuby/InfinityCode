class Api::V1::QuestsController < Api::V1::BaseController
  before_action :signed_in?, except: [:index, :show]

  # /api/v1/quests?status=Success
  # /api/v1/quests?level[]=Easy&status=Failure
  # /api/v1/quests?level[]=Easy&level[]=Hard
  def index
    if params[:status] == "Success"
      @quests = current_user.quests.distinct.where("answers.status = ?", "Success").with_level(params[:level])
    elsif params[:status] == "Failure"
      @quests = current_user.quests.distinct.with_level(params[:level])-current_user.quests.distinct.where("answers.status = ?", "Success").with_level(params[:level])
    else
      @quests = Quest.with_level(params[:level])
    end

    json_response(@quests)
  end

  # 【GET】查詢指定題目  /api/v1/quests/:id
  def show
    @quest = Quest.find(params[:id]) 
    json_response(@quest)
  end

  # 【POST】新增答題記錄  /api/v1/quests/:id/answer
  # body: { type: 'ruby', answer: '答題內容' }
  def answer
    # 測試案例
    test_case = Case.where(quest_id: params[:id])
    input = test_case.map { |element| element.input }
    output = test_case.map { |element| element.output }

    # 產生解題紀錄檔
    type = converter(params[:quest][:type])
    file_path = export_file(type[:extension], params[:quest][:code], input)

    # 操作 Docker 服務
    container = DockerService.new(image: type[:image], file: file_path)
    container.create
    log = container.start
    container.delete

    # 測試案例比對
    status = (output.join("\r\n").eql?(log.chomp) ? 'Success' : 'Failure')
    answer = current_user.answers.create!(answer_params.merge(quest_id: params[:id], status: status))
    
    # 刪除暫存檔
    File.delete(file_path)
    
    # JSON
    json_data = {
      status: answer.status,
      input: input.map{ |element| element.match(/\(([^()]*)\)/)[1] },
      output: log.chomp.split("\r\n"),
      expected: output
    }

    json_response(json_data, :created)
  end

  private
  def answer_params
    params.require(:quest).except(:type).permit(:code)
  end
end