post = Post.find(params[:id])

json.(post, :id, :title, :content, :publish_author, :created_at, :updated_at)
json.author do
  json.name post.user.profile.name
  json.email post.user.email
  json.avatar url_for(post.user.profile.avatar_url)
end

page_size = 10
comments = post.comments.page(params[:page]).per(page_size)
comments_total_pages = comments.total_pages

json.comments_total_pages comments_total_pages
json.comments comments do |comment|
  json.(comment, :id, :content, :created_at, :updated_at)

  json.author do
    json.name comment.user.profile.name
    json.email comment.user.email
    json.avatar url_for(comment.user.profile.avatar_url)
  end
end