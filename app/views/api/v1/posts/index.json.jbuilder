if params[:search].nil?
  posts = Post.all
else
  posts = Post.where("title LIKE '%?%'", params[:search])
end

page_size = 10
total_page = (posts.count / page_size.to_f).ceil
posts = posts.page(params[:page]).per(page_size)

json.total_page total_page
json.posts posts do |post|
  json.(post, :id, :title, :content)

  json.author do
    json.name post.user.profile.name
    json.email post.user.email
    json.avatar url_for(post.user.profile.avatar_url)
  end

  if post.comments.count > 0
    json.newest_comment_author do
      json.name post.comments.first.user.profile.name
      json.email post.comments.first.user.email
    end
  else
    json.newest_comment_author "目前尚無留言"
  end

  
end