document.addEventListener('turbolinks:load', () => {
  const ranks = document.querySelector(".rank-content");
  const rankBtn = document.querySelectorAll(".rank-button");

  if (ranks) {
    // Function - 排行榜 API 串接
    const dataRender = (e) => {
      const toggledBtn = document.querySelector('button.toggle');
      const toggledDiv = document.querySelector('div.toggle');
      let type;

      if (e) {
        toggledBtn.classList.remove('toggle');
        e.target.classList.add('toggle');

        toggledDiv.classList.remove('toggle');
        type = e.target.dataset.id;
        document.querySelector(`div#${type}`).classList.add('toggle');
      } else {
        type = toggledBtn.dataset.id;
      }

      fetch(`/api/v1/ranks/${type}`)
        .then((res) => res.json())
        .then((obj) => {
          obj.forEach((data, index) => {
            const item = document.querySelector(`.${type}-${index + 1}`);
            const color = ['gold', 'silver', 'copper'];

            item.innerHTML = `<i class="fas fa-trophy ${color[index]}"></i><span class="name">${data.profile.name}</span><span class="count">${data.score}</span>`;
          });
        });
    };

    dataRender();

    rankBtn.forEach((btn) => {
      btn.addEventListener('click', dataRender);
    });
  }
});
