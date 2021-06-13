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
  const likeNameFirst = document.querySelector('.like-1');
  const likeNameSecond = document.querySelector('.like-2');
  const likeNameThird = document.querySelector('.like-3');
  const questNameFirst = document.querySelector('.quests-1');
  const questNameSecond = document.querySelector('.quests-2');
  const questNameThird = document.querySelector('.quests-3');

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
  fetch('./api/v1/ranks/coins')
    .then(request => request.json())
    .then(coins => {
      coinNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${coins[0].profile.name}</span><span class="count">${coins[0].score}</span>`
      coinNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${coins[1].profile.name}</span><span class="count">${coins[1].score}</span>`
      coinNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${coins[2].profile.name}</span><span class="count">${coins[2].score}</span>`     
    })
  }
  if (postNameFirst && postNameSecond && postNameThird) {
  fetch('./api/v1/ranks/posts')
    .then(request => request.json())
    .then(posts => {
      postNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${posts[0].profile.name}</span><span class="count">${posts[0].score}</span>`
      postNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${posts[1].profile.name}</span><span class="count">${posts[1].score}</span>`
      postNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${posts[2].profile.name}</span><span class="count">${posts[2].score}</span>`
    })
  }
  if (likeNameFirst && likeNameSecond && likeNameThird) {
  fetch('./api/v1/ranks/likes')
    .then(request => request.json())
    .then(likes => {
      likeNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${likes[0].profile.name}</span><span class="count">${likes[0].score}</span>`
      likeNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${likes[1].profile.name}</span><span class="count">${likes[1].score}</span>`
      likeNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${likes[2].profile.name}</span><span class="count">${likes[2].score}</span>`
    })
  }
  if (questNameFirst && questNameSecond && questNameThird) {
    fetch('./api/v1/ranks/solved')
      .then(request => request.json())
      .then(solved => {
        questNameFirst.innerHTML = `<i class="fas fa-trophy gold"></i><span class="name">${solved[0].profile.name}</span><span class="count">${solved[0].score}</span>`
        questNameSecond.innerHTML = `<i class="fas fa-trophy sliver"></i><span class="name">${solved[1].profile.name}</span><span class="count">${solved[1].score}</span>`
        questNameThird.innerHTML = `<i class="fas fa-trophy copper"></i><span class="name">${solved[2].profile.name}</span><span class="count">${solved[2].score}</span>`
      })
    }
})

