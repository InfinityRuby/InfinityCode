json.array! @problem  do |answer|
  json.id answer.user_id
  json.quest_id answer.quest_id
  json.code answer.code
  json.time answer.created_at

  json.quest do
    json.title answer.quest.title
  end

  json.profile do
    json.name answer.user.profile.name
    json.avatar answer.user.profile.avatar.url
  end
end


json.array! @problems  do |answer|
  json.id answer.user_id
  json.quest_id answer.quest_id
  json.code answer.code
  json.time answer.created_at

  json.quest do
    json.title answer.quest.title
  end

  json.profile do
    json.name answer.user.profile.name
    json.avatar answer.user.profile.avatar.url
  end
end