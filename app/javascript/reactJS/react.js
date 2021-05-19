import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState} from "react"


document.addEventListener('DOMContentLoaded', () => {

  function LittleForum(props) {
    const {title, content} = props
    return(
      <div className="item">
        <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
        <div>      
            <h2><a href="#">{title}</a></h2>
            <h3>{content}</h3>
        </div>
      </div>
    )
  }

  function Forum() {
    const [list, useList] = useState([])
    useEffect(() => {
      fetch('/jsons/data')
      .then(res => res.json())
      .then(post => useList(post))    
  }, [])
   
    return(
    <div>
        <div className="item">
          <a href="#">All Interview Quesions</a>
          <a href="#">System Design</a>
          <a href="#">Operating System</a>
          <a href="#">Object-Oriented Design</a>
        </div>
        <div className="item">
            <div>
              <a href="#">Hot</a>
              <a href="#">Newest to Oidest</a>
              <a href="#">Most Votes</a>
            </div>
            <div>
              <input type="text" id="forum_input" placeholder="Search topics or comments" />
              <button>New +</button>
            </div>
        </div>
        {
          list.map((list) => {
            return <LittleForum key={list.id} title={list.title} content={list.content} />
          })
        }
    </div>
    )
  }

  ReactDOM.render(
    <Forum />,
    document.getElementById('wwrap')
  )
})