# 篩選條件 - 難易度
quests = Quest.with_level(params[:level])

# 篩選條件 - 是否解題過
solved_quests = current_user.quests.distinct.where("answers.status = ?", "Success").with_level(params[:level])

if params[:is_solved].size == 1
  if params[:is_solved].include?("true")
    quests = solved_quests
  elsif params[:is_solved].include?("false")
    quests = quests - solved_quests
  end
end

json.array! quests do |quest|
  json.(quest, :id, :title)

  # 難易度中文處理
  case quest.level
  when 'Easy'
    level = '簡單'
  when 'Medium'
    level = '中等'
  when 'Hard'
    level = '困難'
  end

  # 答對率
  answers = Answer.where(quest_id: quest.id)
  total_count = answers.count
  correct_count = answers.where(status: 'Success').count

  if total_count == 0 && correct_count == 0
    correct_rate = '無'
  else
    correct_rate = "#{ (correct_count / total_count.to_f).round(4) * 100 }%"
  end

  # 是否解題過
  if solved_quests.where(id: quest.id).count > 0
    is_solved = true
  else
    is_solved = false
  end

  json.level level
  json.correct_rate correct_rate
  json.is_solved is_solved
end
