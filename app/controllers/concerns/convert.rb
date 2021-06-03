module Convert

  def converter(type)
    case type
    when 'ruby'
      extension = 'rb'
      image = 'ruby'
    when 'js'
      extension = 'js'
      image = 'node'
    end

    return { image: image, extension: extension }
  end

  def export_file(ext, code, test_case)
    user_input = "#{ code }\n\n#{ test_case.join("\n") }"
    file_name = "./storage/code_#{ DateTime.now.strftime('%Y%m%d%H%M%3N') }.#{ ext }"
    File.open(file_name, "w") { |f| f.write user_input }

    return File.realdirpath(file_name)
  end
end