quest = Quest.find(params[:id]) 

json.(quest, :id, :title, :description, :picture, :problem)

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

# json.array! quests do |quest|
#   json.(quest, :id, :title)

  


  
# end