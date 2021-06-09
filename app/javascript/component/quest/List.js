import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import API from 'component/lib/API'

function List() {
  const [lists, setLists] = useState([])
  const [solved, setSolved] = useState([])
  useEffect(() => {
    API.get(`quests`)
      .then(res => setLists(res))

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
      levelChange().then(res => setLists(res))
    }
  }

  const levelChange = () => {
    const url = `quests/?level[]=`
    const levelCheckbox = document.querySelectorAll('.level-checkbox')
    const level = []
    let count = 0
    levelCheckbox.forEach(el => {
      level.push(el.checked)
      if(count == 3 || count == 4) {
        el.checked = false
      }
      count++
    })
    if(level[0] && !level[1] && !level[2]) {
      return levelSelect(`${url}Easy`)
    }else if(level[0] && level[1] && !level[2]) {
      return levelSelect(`${url}Easy&level[]=Medium`)
    }else if(level[0] && !level[1] && level[2]) {
      return levelSelect(`${url}Easy&level[]=Hard`)
    }else if(level[0] && level[1] && level[2]) {
      return levelSelect(`${url}Easy&level[]=Medium&level[]=Hard`)
    }else if(!level[0] && level[1] && !level[2]) {
      return levelSelect(`${url}Medium`)
    }else if(!level[0] && level[1] && level[2]) {
      return levelSelect(`${url}Medium&level[]=Hard`)
    }else if(level[2]) {
      return levelSelect(`${url}Hard`)   
    }else {
      return levelSelect(`quests`)
    }
  }

  const levelSelect = (url) => {
    return API.get(url)
             .then(res => {
               setLists(res)
               return res
             })
  }
  
  return(
    <div>
      <div className="quest-checkbox">
        <input type="checkbox" className="level-select level-checkbox" id="s1" onClick={ levelChange }/>
        <label htmlFor="s1" className="level-label">簡單</label>
    
        <input type="checkbox" className="level-select level-checkbox" id="s2" onClick={ levelChange }/>
        <label htmlFor="s2" className="level-label">中等</label>
    
        <input type="checkbox" className="level-select level-checkbox" id="s3" onClick={ levelChange }/>
        <label htmlFor="s3" className="level-label">困難</label>
    
        <div className="split">|</div>
        <input type="checkbox" className="completion-select level-checkbox" 
        id="s4" onClick={ solveChange.bind(this, true) } />
        <label htmlFor="s4">已解決</label>
    
        <input type="checkbox" className="completion-select level-checkbox" 
        id="s5" onClick={ solveChange.bind(this, false) }/>
        <label htmlFor="s5">未解決</label>
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