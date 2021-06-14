if user_signed_in?
  profile = current_user.profile

  json.(current_user, :id, :email, :coin_amount)
  json.(profile, :name)
  json.avatar url_for(profile.avatar_url)
end