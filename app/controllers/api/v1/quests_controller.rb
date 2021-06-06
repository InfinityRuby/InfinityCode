class Api::V1::QuestsController < Api::V1::BaseController
  before_action :signed_in?, except: [:index, :show]

  # 【GET】查詢題目列表  /api/v1/quests
  def index
    # @quests = Quest.all 
    # byebug

    # if params[:level] && params[:title]
    #   @quests = Quest.where(level: params[:level]).where(level: params[:level])
    # elsif params[:level]
    #   @quests = Quest.where(level: params[:level])
    # elsif params[:title]
    #   @quests = Quest.where(level: params[:level])
    # else
    #   @quests = Quest.all
    # end


    if params[:status] == "Success"
      @quests = current_user.quests.distinct.where("answers.status = ?", "Success").with_level(params[:level])
    elsif params[:status] == "Failure"
      @quests = current_user.quests.distinct.where("answers.status = ?", "Failure").with_level(params[:level])
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

  # /api/v1/quests/easy
  # /api/v1/quests?level=easy&status=Success
  # /api/v1/quests?status=Success
  # /api/v1/quests?level=easy


  # def easy
  #   @quests = Quest.where(level: 'Easy')
  #   json_response(@quests)
  # end

  # def medium
  #   @quests = Quest.where(level: 'Medium')
  #   json_response(@quests)
  # end

  # def hard
  #   @quests = Quest.where(level: 'Hard')
  #   json_response(@quests)
  # end

  def solved
    @quests = current_user.answers.where(status: 'Success')
    json_response(@quests)
  end

  # def unsolved
  #   @quests = current_user.answers.where(status: 'Failure')
  #   json_response(@quests)
  # end

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