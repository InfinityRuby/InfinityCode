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
        id="level-isSolved" onClick={ () => levelChange(3) }/>
        <label htmlFor="level-isSolved">已解決</label>
    
        <input type="checkbox" className="completion-select quests-checkbox" 
        id="level-unsolved" onClick={ () => levelChange(4) }/>
        <label htmlFor="level-unsolved">未解決</label>
      </div>
      <div id="list-quest">
        <Quests lists={ lists } />
      </div>
    </div>
  )
}

function Quests({ lists }) {
  return lists.map(list => {
    const { id, title, level, is_solved } = list
    return <Quest key={ id }
                  id={ id }
                  title={ title }
                  level={ level }
                  solved={ is_solved } />
  })
}

function Quest({ id, title, level, solved }) {
  return (
    <a className = "quest-name" href={`/quests/${id}`}>
      <h3>{ title }</h3>
      <div className = "listWrapper">
        <div className="questionLevel"><p>{ level }</p></div>
        <button className={ solved ? 
          'questionBtn solid-button' : 'questionBtn question-unsolved line-button' }>
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