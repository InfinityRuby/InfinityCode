json.array! @users  do |user|
    json.user_id user.id
    json.coin_amount user.coin_amount

    json.profile do
      json.name user.profile.name
      json.avatar user.profile.avatar.url
    end
end