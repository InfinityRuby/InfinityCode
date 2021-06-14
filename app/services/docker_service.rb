class DockerService
  attr_accessor :image, :file, :container_id

  def initialize(condition)
    @image = condition[:image]
    @file = condition[:file]

    # image 版本處理
    unless @image.include? ':'
      if @image == 'ruby'
        @image = @image + ':2.7.3'
      else
        @image = @image + ':latest'
      end
    end

  end

  def run
    create
    log = start
    delete

    return log
  end

  private
  def create
    @container_id = `docker create -it -v #{ @file }:/mnt/data #{ @image } ruby /mnt/data`
  end

  def start
    `docker start -a -i #{ @container_id }`
  end

  def delete
    `docker rm #{ @container_id }`
  end
end