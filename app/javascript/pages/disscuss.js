document.addEventListener('turbolinks:load', () => {
  const first = document.querySelector('.first')
  const second = document.querySelector('.second')
  const third = document.querySelector('.third')
  const fourth = document.querySelector('.fourth')



  if(first && second && third && fourth) {
    fetch('api/v1/posts')
      .then(request => request.json())
      .then(posts => {
        const post = posts.posts    
        const idFirst = post[0].id
        const titleFirst = post[0].title.slice(0, 6)
        const contentFirst = post[0].content.slice(0, 6)
        const nameFirst = post[0].author.name
        const avatarFirst = post[0].author.avatar
        
        const idSecond = post[1].id
        const titleSecond = post[1].title.slice(0, 6)
        const contentSecond = post[1].content.slice(0, 6)
        const nameSecond = post[1].author.name
        const avatarSecond = post[1].author.avatar

        const idThird = post[2].id
        const titleThird = post[2].title.slice(0, 6)
        const contentThird = post[2].content.slice(0, 6)
        const nameThird = post[2].author.name
        const avatarThird = post[2].author.avatar

        const idFourth = post[3].id
        const titleFourth = post[3].title.slice(0, 6)
        const contentFourth = post[3].content.slice(0, 6)
        const nameFourth = post[3].author.name
        const avatarFourth = post[3].author.avatar
  
        first.innerHTML = 
        `<div class="post-content">
          <div class="pic"><img src="${avatarFirst}" alt="jpg" /></div>
        <div>
          <h2><a href="/posts/${idFirst}">${titleFirst}</a></h2>
          <h3 class="content-1">${contentFirst}...</h3>
        </div>
        </div>
        <div class="author">
          <div>文章作者: <span>${nameFirst}</span></div>
        </div></div>`
        second.innerHTML = 
        `<div class="post-content">
          <div class="pic"><img src="${avatarSecond}" alt="jpg" /></div>
        <div>
          <h2><a href="/posts/${idSecond}">${titleSecond}</a></h2>
          <h3 class="content-1">${contentSecond}...</h3>
        </div>
        </div>
        <div class="author">
          <div>文章作者: <span>${nameSecond}</span></div>
        </div></div>`
        third.innerHTML = 
        `<div class="post-content">
          <div class="pic"><img src="${avatarThird}" alt="jpg" /></div>
        <div>
          <h2><a href="/posts/${idThird}">${titleThird}</a></h2>
          <h3 class="content-1">${contentThird}...</h3>
        </div>
        </div>
        <div class="author">
          <div>文章作者: <span>${nameThird}</span></div>
        </div></div>`
        fourth.innerHTML = 
        `<div class="post-content">
          <div class="pic"><img src="${avatarFourth}" alt="jpg" /></div>
        <div>
          <h2><a href="/posts/${idFourth}">${titleFourth}</a></h2>
          <h3 class="content-1">${contentFourth}...</h3>
        </div>
        </div>
        <div class="author">
          <div>文章作者: <span>${nameFourth}</span></div>
        </div></div>`
    })
  }
})


