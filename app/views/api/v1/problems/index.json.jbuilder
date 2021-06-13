json.array! @problems  do |quest|
  json.(quest, :id, :title, :created_at)

  # 難易度中文處理
  case quest.level
  when 'Easy'
    level = '簡單'
  when 'Medium'
    level = '中等'
  when 'Hard'
    level = '困難'
  end

  json.level level

  json.profile do
    json.name current_user.profile.name
    json.avatar current_user.profile.avatar.url
  end
end