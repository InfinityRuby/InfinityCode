import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import API from 'component/lib/API'

function List() {
  const [lists, setLists] = useState([])
  const [solved, setSolved] = useState([])
  const [url, setURL] = useState('quests?')
  useEffect(() => {
    API.get(url)
      .then(res => setLists(res))
  }, [url])

  useEffect(() => {
    API.get(`quests?status=Success`)
      .then(res => {
        const solvedID = res.map(el => el.id)
        setSolved(solvedID)
      })
  }, [])

  const solveChange = (status, event) => {
    let solveList
    status ? solveList = lists.filter(el => solved.includes(el.id)) 
            :
             solveList = lists.filter(el => !solved.includes(el.id))
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
        levelSolved = res.filter(el => solved.includes(el.id))
      }else if(solveCheckbox[1].checked) {
        levelSolved = res.filter(el => !solved.includes(el.id))
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
        id="level-solved" onClick={ solveChange.bind(this, true) }/>
        <label htmlFor="level-solved">已解決</label>
    
        <input type="checkbox" className="completion-select" 
        id="level-unsolved" onClick={ solveChange.bind(this, false) }/>
        <label htmlFor="level-unsolved">未解決</label>
      </div>
      <div id="list-quest">
        <Quests lists={ lists } solved={ solved }/>
      </div>
    </div>
  )
}

function Quests({ lists, solved }) {
  return lists.map(list => {
    const { id, title, level } = list
    return <Quest key={ id }
                  id={ id }
                  title={ title }
                  level={ level }
                  solved={ solved } />
  })
}

function Quest({ id, title, level, solved }) {
  return (
    <a className = "quest-name" href={`/quests/${id}`}>
      <h3>{ title }</h3>
      <div className = "listWrapper">
        <div className="questionLevel"><p>{ level }</p></div>
        <button className={ solved.includes(id) ? 'questionBtn' : 'questionBtn question-unsolved' }>
          { solved.includes(id) ? '已解決' : '未解決' }
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