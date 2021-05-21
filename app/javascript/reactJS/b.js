import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState} from "react"

document.addEventListener('DOMContentLoaded', () => {
  
  function CommanItem(props) {
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
  
  function FourmSearch() {
    const [search, setSearch] = useState([])
    const [record, setRecord] = useState([])
    useEffect(() => {
      fetch('/jsons/data')
      .then(res => res.json())
      .then((post) =>{setSearch(post)})
    }, [])

    function todo(event) {
        const current_search = search.find(el => el.title == event.target.value)
     
        if(current_search != undefined){
          setRecord(current_search)
        }
        console.log(record)
    }

    return(
        <div>
          <div className="item">
            <a href="#">{record.title}</a>
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
              <input type="text" placeholder="Search topics or comments" onInput={todo} />
              <button>New +</button>
            </div>
          </div>
            {
             search.map((el) => {
              if(record)
              {
                console.log(record)
              }
             })   
            }
        </div>
    )
  }

  

  ReactDOM.render(
    <FourmSearch />,
    document.getElementById('forum_input')
  )
})