json.array! @users do |user|
  json.id user.id
  json.profile do
    json.name user.profile.name
    json.avatar user.profile.avatar.url
  end
  json.posts_count @user_posts_count[user.id]
end