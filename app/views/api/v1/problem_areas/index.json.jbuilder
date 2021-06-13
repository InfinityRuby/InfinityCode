json.array! @problem_areas  do |quest|
  json.quest_id quest.id
  json.title quest.title
  json.level quest.level
  json.time quest.created_at

  json.profile do
    json.name current_user.profile.name
    json.avatar current_user.profile.avatar.url
  end
end