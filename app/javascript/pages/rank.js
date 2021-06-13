document.addEventListener('turbolinks:load', () => {
  const ranks = document.querySelector(".rank-content");
  const rankBtn = document.querySelectorAll(".rank-button");
  const rankContents = document.querySelectorAll(".content");
  const coinNameFirst = document.querySelector('.coin-1');
  const coinNameSecond = document.querySelector('.coin-2');
  const coinNameThird = document.querySelector('.coin-3');
  const postNameFirst = document.querySelector('.post-1');
  const postNameSecond = document.querySelector('.post-2');
  const postNameThird = document.querySelector('.post-3');
  const commentNameFirst = document.querySelector('.comment-1');
  const commentNameSecond = document.querySelector('.comment-2');
  const commentNameThird = document.querySelector('.comment-3');

  if(ranks) {
    ranks.onclick = e => {
      const id = e.target.dataset.id;
      if (id) {
        rankBtn.forEach(btn => {
          btn.classList.remove("toggle");
        });
        e.target.classList.add("toggle");
    
        rankContents.forEach(content => {
          content.classList.remove("toggle");
        });
        const element = document.getElementById(id);
        element.classList.add("toggle");
      }
    }
  }  
  if (coinNameFirst && coinNameSecond && coinNameThird) {
  fetch('./api/v1/ranks/coin_top_three')
    .then(request => request.json())
    .then(coins => {
      coinNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${coins[0].profile.name}</span><span class="count">${coins[0].coin_amount}</span>`
      coinNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${coins[1].profile.name}</span><span class="count">${coins[1].coin_amount}</span>`
      coinNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${coins[2].profile.name}</span><span class="count">${coins[2].coin_amount}</span>`     
    })
  }
  if (postNameFirst && postNameSecond && postNameThird) {
  fetch('./api/v1/ranks/post_top_three')
    .then(request => request.json())
    .then(posts => {
      postNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${posts[0].profile.name}</span><span class="count">${posts[0].posts_count}</span>`
      postNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${posts[1].profile.name}</span><span class="count">${posts[1].posts_count}</span>`
      postNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${posts[2].profile.name}</span><span class="count">${posts[2].posts_count}</span>`
    })
  }
  if (commentNameFirst && commentNameSecond && commentNameThird) {
  fetch('./api/v1/ranks/comment_top_three')
    .then(request => request.json())
    .then(comments => {
      commentNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${comments[0].profile.name}</span><span class="count">${comments[0].comments_count}</span>`
      commentNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${comments[1].profile.name}</span><span class="count">${comments[1].comments_count}</span>`
      commentNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${comments[2].profile.name}</span><span class="count">${comments[2].comments_count}</span>`
    })
  }
})

