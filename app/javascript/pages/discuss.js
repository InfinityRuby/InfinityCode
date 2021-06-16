document.addEventListener('turbolinks:load', () => {
  const items = document.querySelectorAll('.discuss-list');

  if (items.length > 0) {
    fetch('/api/v1/posts')
      .then((res) => res.json())
      .then((obj) => obj.posts)
      .then((posts) => {
        posts = posts.slice(0, 4);
        
        if (posts.length > 0) {
          posts.forEach((post, index) => {
            const id = post.id;
            const title = post.title.slice(0, 13);
            const content = post.content.slice(0, 13);
            const name = post.author.name;
            const avatar = post.author.avatar;
  
            items[index].innerHTML = `<div class="post-content">
              <div class="pic"><img src="${avatar}" alt="jpg" /></div>
            <div>
              <h2><a href="/posts/${id}">${title}</a></h2>
              <h3 class="content-1">${content}...</h3>
            </div>
            </div>
            <div class="author">
              <div>文章作者: <span>${name}</span></div>
            </div></div>`;
          });
        }
        
      });
  }
});
