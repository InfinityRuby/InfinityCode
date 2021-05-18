import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState} from "react"


document.addEventListener('DOMContentLoaded', () => {

  function Clock() {
    const [list, useList] = useState([])
    useEffect(() => {
      fetch('/app/javascript/reactJS/comman.json')
    })
   
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
                <input type="text" placeholder="Search topics or comments" />
                <button>New +</button>
            </div>
        </div>
        <div className="item">
          <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
          <div>
              <h2>Microsoft Online Assessment Questions</h2>
              <h3>Sithis created at:August 6, 2019 7:16 PM | Last Reply: sg3932 18 hours ago</h3>
          </div>
        </div>
    </div>
    )
  }

  ReactDOM.render(
      <Clock />,
    document.getElementById('wwrap')
  )

})

