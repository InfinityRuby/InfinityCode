post = Post.find(params[:id])

json.(post, :id, :title, :content)
json.author do
  json.name post.user.profile.name
  json.email post.user.email
  json.avatar url_for(post.user.profile.avatar_url)
end

comments = post.comments.page(params[:page]).per(10)

json.comments comments do |comment|
  json.(comment, :id, :content)

  json.author do
    json.name comment.user.profile.name
    json.email comment.user.email
    json.avatar url_for(comment.user.profile.avatar_url)
  end
end