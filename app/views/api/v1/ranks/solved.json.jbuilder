users = []

User.find_each do |user|
  solved_count = user.quests.distinct.where("answers.status = ?", "Success").count

  users.push(id: user.id, solved_count: solved_count)
end

top_ten_users = users.max(10) { |a, b| a[:solved_count] <=> b[:solved_count] }

json.array! top_ten_users do |user|
  if user[:solved_count] > 0
    json.id user[:id]

    profile = User.find(user[:id]).profile

    json.profile do
      json.name profile.name
      json.avatar profile.avatar.url
    end

    json.score user[:solved_count]
  end
end