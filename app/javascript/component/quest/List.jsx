import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import API from 'component/lib/API'

function List() {
  const [lists, setLists] = useState([])
  const [url, setURL] = useState('quests?')
  
  useEffect(() => {
    API.get(url)
      .then(res => setLists(res))
  }, [url])

  const levelChange = (i) => {
    const filter = [`level[]=Easy&`, `level[]=Medium&`, 
                   `level[]=Hard&`, `is_solved[]=true&`, 
                   `is_solved[]=false&`]
    const levelCheckbox = document.querySelectorAll('.quests-checkbox') 
    levelCheckbox[i].checked ? setURL(url + filter[i]) : setURL(url.replace(filter[i], ''))
  }
  
  return(
    <div>
      <div className="quest-checkbox">
        <input type="checkbox" className="level-select quests-checkbox" id="level-easy" onClick={ () => levelChange(0) }/>
        <label htmlFor="level-easy" className="level-label">簡單</label>
    
        <input type="checkbox" className="level-select quests-checkbox" id="level-medium" onClick={ () => levelChange(1) }/>
        <label htmlFor="level-medium" className="level-label">中等</label>
    
        <input type="checkbox" className="level-select quests-checkbox" id="level-hard" onClick={ () => levelChange(2) }/>
        <label htmlFor="level-hard" className="level-label">困難</label>
    
        <div className="split">|</div>
        <input type="checkbox" className="completion-select quests-checkbox" 
        id="level-solved" onClick={ () => levelChange(3) }/>
        <label htmlFor="level-solved" className="level-label">已解決</label>
    
        <input type="checkbox" className="completion-select quests-checkbox" 
        id="level-unsolved" onClick={ () => levelChange(4) }/>
        <label htmlFor="level-unsolved" className="level-label">未解決</label>
      </div>
      <div id="list-quest">
        <Quests lists={ lists } />
      </div>
    </div>
  )
}

function Quests({ lists }) {
  return lists.map(list => {
    const { id, title, level, is_solved, correct_rate } = list
    return <Quest key={ id }
                  id={ id }
                  title={ title }
                  level={ level }
                  solved={ is_solved }
                  correct_rate={ correct_rate } />
  })
}

function Quest({ id, title, level, solved, correct_rate }) {
  return (
    <a className = "quest-name" href={`/quests/${id}`}>
      <h3>{ title }</h3>
      <div className = "list-wrapper">
        <div>
          <div className={ `question-level
                           ${level == `簡單` && `bg-green-100 border-green-500 text-green-500`}
                           ${level == `中等` && `bg-yellow-100 border-yellow-500 text-yellow-500`}
                           ${level == `困難` && `bg-red-100 border-red-500 text-red-500`}` }>
            <p>{ level }</p>
          </div>
          <span>正確率：{ correct_rate }</span>
          <img src="/quest/star.jpg" alt="star" />
          <span>{ level == `簡單` && 5 || level == `中等` && 10 || level == `困難` && 15 }</span>
        </div>
        <button className={ solved ? 
          'question-btn solid-button' : 'question-btn question-unsolved line-button' }>
          { solved ? '已解決' : '未解決' }
        </button>
      </div>
    </a>
  )
}

document.addEventListener('turbolinks:load', () => {
  const list = document.getElementById('listquest-wrapper')
  if(list) {
    ReactDOM.render(<List />, list)
  }
})