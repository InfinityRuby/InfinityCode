solved = current_user.quests.distinct.where("answers.status = ?", "Success").with_level(params[:level])

if params[:status] == "Success"
  quests = solved
elsif params[:status] == "Failure"
  quests = Quest.distinct.with_level(params[:level]) - solved
else
  quests = Quest.with_level(params[:level])
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
  total_answer_count = Answer.where(quest_id: quest.id).count
  success_answer_count = Answer.where(quest_id: quest.id, status: 'Success').count

  if total_answer_count == 0 && success_answer_count == 0
    correct_rate = '無'
  else
    correct_rate = "#{ (success_answer_count / total_answer_count.to_f).round(4) * 100 }%"
  end

  # 是否解題過
  if current_user.answers.where(quest_id: quest.id, status: 'Success').distinct.count > 0
    is_solved = true
  else
    is_solved = false
  end

  json.level level
  json.correct_rate correct_rate
  json.is_solved is_solved
end



# if params[:search].nil?
#   posts = Post.all
# else
#   posts = Post.where("title LIKE '%?%'", params[:search])
# end
# posts = posts.page(params[:page]).per(10)

# json.array! posts do |post|
#   json.(post, :id, :title, :content)

#   json.author do
#     json.name post.user.profile.name
#     json.email post.user.email
#     json.avatar url_for(post.user.profile.avatar_url)
#   end

#   if post.comments.count > 0
#     json.newest_comment_author do
#       json.name post.comments.first.user.profile.name
#       json.email post.comments.first.user.email
#     end
#   else
#     json.newest_comment_author "目前尚無留言"
#   end

  
# end
    
    