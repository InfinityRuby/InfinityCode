class Api::V1::QuestsController < Api::V1::BaseController
  before_action :signed_in?, except: [:index, :show]

  # 查詢符合篩選資料的題目
  # GET: /api/v1/quests?status=Success
  # GET: /api/v1/quests?level[]=Easy&status=Failure
  # GET: /api/v1/quests?level[]=Easy&level[]=Hard
  def index
  end

  # 查詢指定題目
  # GET: /api/v1/quests/:id
  def show
  end

  # 新增答題記錄
  # POST: /api/v1/quests/:id/answer
  # params: { type: 'ruby', answer: '答題內容' }
  def answer
    # 測試案例
    test_case = Case.where(quest_id: params[:id])
    input = test_case.map { |element| "p #{ element.input }" }
    output = test_case.map { |element| element.output }

    # 產生解題紀錄檔
    type = converter(params[:quest][:type])
    file_path = export_file(type[:extension], params[:quest][:code], input)

    # 操作 Docker 服務
    container = DockerService.new(image: type[:image], file: file_path)
    log = container.run

    # 測試案例比對
    status = (output.join("\r\n").eql?(log.chomp) ? 'Success' : 'Failure')
    answer = current_user.answers.create!(answer_params.merge(quest_id: params[:id], status: status))

    # 刪除暫存檔
    File.delete(file_path)

    # JSON 內容整理
    input = input.map{ |element| element.match(/\(([^()]*)\)/) }

    if input.any?
      input = input.map{ |element| element[1] }
    else
      input = []
    end

    json_data = {
      status: answer.status,
      input: input,
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