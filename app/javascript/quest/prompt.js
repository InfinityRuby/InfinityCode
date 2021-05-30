document.addEventListener('turbolinks:load', () => {
  const questContent = document.querySelector('#prompt')
  
  const url = window.location.href; 
  const loc = url.substring(url.lastIndexOf('/') + 1 ); 
  fetch(`/api/v1/quests/${loc}/prompts`)
  .then(request => request.json())
  .then(quest => {
    let classCounter = 0
    quest.forEach(element => {
      classCounter += 1
      const createBtn = document.createElement('button');
      const createDiv = document.createElement('div');
      const createEl = document.createElement('p');
      createBtn.classList.add(`quest-prompt-button`);
      createBtn.classList.add(`questCounter`);
      createBtn.classList.add('questbtn');
      createDiv.classList.add('btn-content');
      createEl.classList.add(`prompt-content`)
      createEl.classList.add(`markdown-body`)
      createEl.classList.add(`close`)
      createBtn.textContent = '免費提示'
      createEl.textContent = element.hint;
      createDiv.appendChild(createBtn)
      createDiv.appendChild(createEl)
      questContent.appendChild(createDiv)
    });
    const coinPrompt = document.querySelectorAll('.quest-prompt-button')
    const contentPrompt = document.querySelectorAll('.prompt-content')
    const cleanCoinPrompt = coinPrompt[coinPrompt.length - 1]    
    cleanCoinPrompt.textContent = "金幣提示"

    for(let i = 0; i < coinPrompt.length; i++){
      coinPrompt[i].addEventListener('click', () => {
        contentPrompt[i].classList.toggle('close')
      })
    }
  })
})
