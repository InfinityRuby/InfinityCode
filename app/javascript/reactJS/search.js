import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState} from "react"

document.addEventListener('DOMContentLoaded', () => {
  
  
  function Search() {
    const [search, setSearch] = useState([])
    const [record, setRecord] = useState([])
    useEffect(() => {
      fetch('/jsons/data')
      .then(res => res.json())
      .then((post) =>{setSearch(post)})
    }, [])

    function todo(event) {
        const current_search = search.filter(el => el.title == event.target.value)
        console.log(current_search)
        const item_array = document.querySelectorAll('.item:nth-child(n+3)')

        console.log(search)
        
        if(current_search != undefined){    
          setRecord(current_search)
        }
        console.log(record)
    }

    return(
        <div>
            <input type="text" placeholder="Search for tags..." onChange={todo}/>
            <button>{record.title}</button>
            <button>google</button>
            <button>amazon</button>
            <button>facebook</button>
            <button>phone screen</button>
            <button>google</button>
            <button>amazon</button>
            <button>facebook</button>
            <button>phone screen</button>
            <button>google</button>
            <button>amazon</button>
            <button>facebook</button>
            <h3>...1392 tags not shown</h3>
        </div>
    )
  }

  

  ReactDOM.render(
    <Search />,
    document.getElementById('input')
  )
})