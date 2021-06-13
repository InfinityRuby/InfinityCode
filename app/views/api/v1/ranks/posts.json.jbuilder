posts_count = Post.unscope(:order).group(:user_id).order(count_id: :desc).limit(10).count(:id)
user_ids = posts_count.keys

users = User.includes(:profile).where(id: user_ids).sort { |a, b| user_ids.index(a.id) <=> user_ids.index(b.id) }

json.array! users do |user|
  json.id user.id
  json.profile do
    json.name user.profile.name
    json.avatar user.profile.avatar.url
  end

  json.score posts_count[user.id]
end