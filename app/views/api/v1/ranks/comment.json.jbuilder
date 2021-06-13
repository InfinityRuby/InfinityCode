json.array! @users do |user|
  json.id user.id
  json.profile do
    json.name user.profile.name
    json.avatar user.profile.avatar.url
  end
  json.comments_count @user_comments_count[user.id]
end