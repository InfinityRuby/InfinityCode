json.(@comment, :id, :content, :created_at)

user = User.find(@comment.user_id)

json.name user.profile.name
json.email user.email
json.avatar url_for(user.profile.avatar_url)