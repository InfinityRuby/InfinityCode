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

  const solveChange = (status, event) => {
    let solveList
    status ? solveList = lists.filter(el => el.is_solved) 
            :
             solveList = lists.filter(el => !el.is_solved)
    if(event.target.checked) {
      setLists(solveList)
    }else {
      API.get(url).then(res => setLists(res))
    }
  }

  const levelChange = (i) => {
    const level = [`level[]=Easy&`, `level[]=Medium&`, `level[]=Hard&`]
    const levelCheckbox = document.querySelectorAll('.level-select')
    const solveCheckbox = document.querySelectorAll('.completion-select')
    if(levelCheckbox[i].checked) {
      if(solveCheckbox[0].checked || solveCheckbox[1].checked) {
        solveAPI(i, level, solveCheckbox)
      }else {
        setURL(url + level[i])
      }
    }else {
      setURL(url.replace(`${level[i]}`, ''))
    }
  }

  const solveAPI = (i, level, solveCheckbox) => {
    let levelSolved
    API.get(url + level[i]).then(res => {
      if(solveCheckbox[0].checked) {
        levelSolved = res.filter(el => el.solved)
      }else if(solveCheckbox[1].checked) {
        levelSolved = res.filter(el => !el.solved)
      }
      setLists(levelSolved)
    })
  }
  
  return(
    <div>
      <div className="quest-checkbox">
        <input type="checkbox" className="level-select" id="level-easy" onClick={ () => levelChange(0) }/>
        <label htmlFor="level-easy" className="level-label">簡單</label>
    
        <input type="checkbox" className="level-select" id="level-medium" onClick={ () => levelChange(1) }/>
        <label htmlFor="level-medium" className="level-label">中等</label>
    
        <input type="checkbox" className="level-select" id="level-hard" onClick={ () => levelChange(2) }/>
        <label htmlFor="level-hard" className="level-label">困難</label>
    
        <div className="split">|</div>
        <input type="checkbox" className="completion-select" 
        id="level-isSolved" onClick={ solveChange.bind(this, true) }/>
        <label htmlFor="level-isSolved">已解決</label>
    
        <input type="checkbox" className="completion-select" 
        id="level-unsolved" onClick={ solveChange.bind(this, false) }/>
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