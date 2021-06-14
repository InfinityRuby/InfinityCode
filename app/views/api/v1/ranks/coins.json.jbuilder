users = User.limit(10).order(coin_amount: :desc)

json.array! users  do |user|
  json.id user.id
  json.score user.coin_amount

  json.profile do
    json.name user.profile.name
    json.avatar user.profile.avatar.url
  end
end