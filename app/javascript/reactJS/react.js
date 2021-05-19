import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState} from "react"


document.addEventListener('DOMContentLoaded', () => {
  function SearchForum(props) {
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

  function InitForum(props) {
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
    const [list, setList] = useState([])
    const [search, setSearch] = useState([]) 
    const [change, setChange] = useState(true)

    useEffect(() => {
      fetch('/jsons/data')
      .then(res => res.json())
      .then(post => setList(post))    
    }, [])

    function todo(event) {
      console.log(event.target.value[0])
      if(event.key == 'Enter'){
        setChange(false)
        const current_search = list.filter(hash => hash.title.includes(event.target.value))
        console.log(current_search)
  
        if(current_search != undefined){    
          setSearch(current_search)
        }
      }
      if(event.target.value == ''){
        setChange(true)
      }  
    }
   
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
              <input type="text" id="forum_input" placeholder="Search topics or comments" onKeyDown={todo} />
              <button>New +</button>
            </div>
        </div>
        {
          change ? list.map((list) => {
            return <SearchForum key={list.id} title={list.title} content={list.content} /> 
          }) :
          search.map((search) => {
            return <InitForum key={search.id} title={search.title} content={search.content} />
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