document.addEventListener('turbolinks:load', () => {
  const percentText = document.querySelector('.percent');
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar && percentText) {
    fetch(`/api/v1/users/1/completed_rate`)
    .then((request) => request.json())
    .then((percent) => {
      const totalPercent = (percent.total_percentage * 100).toFixed(0);
      progressBar.innerHTML = `<div class="progress-filler" style="hight: 0.5rem; width: ${totalPercent}%; background-color: #929292"></div>`;
      percentText.textContent = `${totalPercent} %`;
    });
  }
});
