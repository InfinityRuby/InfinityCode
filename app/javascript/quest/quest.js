
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector(".quest-buttonWrapper");
  const tabButton = document.querySelectorAll(".quest-tab-button");
  const contents = document.querySelectorAll(".quest-content");

  tabs.onclick = e => {
    console.log(e.target.dataset)
    const id = e.target.dataset.id;
    if (id) {
      tabButton.forEach(btn => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      contents.forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  }
})