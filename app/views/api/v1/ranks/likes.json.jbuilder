users = []

User.find_each do |user|
  likes = 0

  user.posts.each do |post|
    likes = likes + post.get_likes.count
  end

  users.push(id: user.id, likes: likes)
end

top_ten_users = users.max(10) { |a, b| a[:likes] <=> b[:likes] }

json.array! top_ten_users do |user|
  json.id user[:id]

  json.profile do
    profile = User.find(user[:id]).profile

    json.name profile.name
    json.avatar profile.avatar.url
  end

  json.score user[:likes]
end