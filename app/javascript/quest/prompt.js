document.addEventListener('DOMContentLoaded', () => {
  const promptbtn = document.querySelector('.quest-prompt-button')

  const url = window.location.href; 
    const loc = url.substring(url.lastIndexOf('/') + 1 ); 
    fetch(`/api/v1/quests/${loc}`)
    .then(request => request.json())
    .then(quest => {

})