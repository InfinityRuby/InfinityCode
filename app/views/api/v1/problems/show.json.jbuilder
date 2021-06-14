# quest info - one
quest = Quest.find(params[:id])

json.id quest.id
json.title quest.title

# My answer - 

my_answer = current_user.answers.where(quest_id: quest.id, status: 'Success').order(created_at: :desc).first

json.content my_answer.code
json.(my_answer, :created_at, :updated_at)

json.author do
  json.name current_user.profile.name
  json.email current_user.email
  json.avatar url_for(current_user.profile.avatar_url)
end

page_size = 10
order_by = params[:order] == 'asc' ? :asc : :desc

answers = quest.answers.where(status: 'Success').page(params[:page]).per(page_size).order(created_at: :desc)
answers_total_pages = answers.total_pages

# All answers for this quest
json.comments_total_pages answers_total_pages
json.comments answers do |answer|
  json.(answer, :id, :created_at, :updated_at)
  json.content answer.code

  json.author do
    json.name answer.user.profile.name
    json.email answer.user.email
    json.avatar url_for(answer.user.profile.avatar_url)
  end
end