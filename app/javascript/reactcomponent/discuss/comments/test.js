import marked from 'marked'

const html = marked('# Marked in Node.js\n\nRendered by **marked**.');
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: (code) => hljs.highlightAuto(code).value,
})

document.addEventListener('turbolinks:load', () => {
  const questContent = document.querySelector('#prompt')
  
  const url = window.location.href; 
  const loc = url.substring(url.lastIndexOf('/') + 1 ); 
  fetch(`/api/v1/quests/${loc}/prompts`)
  .then(request => request.json())
  .then(quest => {
    console.log(quest)
    
    const exitBtn = document.querySelector('.btn-content')
    let classCounter = 0
    quest.forEach(element => {
      classCounter += 1
      const createBtn = document.createElement('button');
      const createDiv = document.createElement('div');
      const createEl = document.createElement('p');
      createBtn.classList.add(`quest-prompt-button`);
      createBtn.classList.add(`questCounter${ classCounter }`);
      createBtn.classList.add('questbtn');
      createDiv.classList.add('btn-content');
      createEl.classList.add('prompt-content')
      createBtn.textContent = '免費提示'
      createEl.textContent = marked(element.hint);
      createDiv.appendChild(createBtn)
      createDiv.appendChild(createEl)
      questContent.appendChild(createDiv)
    });
    const coinPrompt = document.querySelectorAll('.quest-prompt-button')
    const contentPrompt = document.querySelectorAll('.prompt-content')
    const cleanCoinPrompt = coinPrompt[coinPrompt.length - 1]    
    cleanCoinPrompt.textContent = "金幣提示"

    let i = 0
    coinPrompt.forEach(el => {
      el.addEventListener('click', () => {
        if(coinPrompt.length > i){
          contentPrompt[i].classList.toggle('close')
          i += 1
        }
      })
    })
    
  })
})
