import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import API from '../discuss/lib/API'

function ListQuest() {
  const [listQuest, setListQuest] = useState([])
  useEffect(() => {
    API('/api/v1/quests')
    .then(posts => setListQuest(posts))
  }, [])
  
  function Quest(props) {
    const question = props
    
    return (
      <a className = "quest-name" href={`/quests/${ question.id }`}>
        <h3>{ question.title }</h3>
        <div className = "listWrapper">
          <div className="questionLevel"><p>{ question.level }</p></div>
          <button className="questionBtn">已解決</button></div>
      </a>
    )
  }
    return(
    listQuest.map(quest => {
      return <Quest key={ quest.id }  id={ quest.id } title={ quest.title } level={ quest.level } />
    })
    )
}
  document.addEventListener('turbolinks:load', () => {
    if (document.getElementById('list-quest')) {ReactDOM.render(
      <ListQuest />,
      document.getElementById('list-quest')
    )}
  })