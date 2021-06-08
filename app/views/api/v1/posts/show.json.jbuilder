post = Post.find(params[:id])

json.(post, :id, :title, :content)
json.author do
  json.name post.user.profile.name
  json.email post.user.email
  json.avatar url_for(post.user.profile.avatar_url)
end

page_size = 10
comments_total_page = (post.comments.count / page_size.to_f).ceil
comments = post.comments.page(params[:page]).per(page_size)

json.comments_total_page comments_total_page
json.comments comments do |comment|
  json.(comment, :id, :content)

  json.author do
    json.name comment.user.profile.name
    json.email comment.user.email
    json.avatar url_for(comment.user.profile.avatar_url)
  end
end