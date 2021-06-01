import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Coin() {
  const [success, setSuccess] = useState(false)
  const coinPrompt = document.querySelectorAll('.quest-prompt-button')
  const url = window.location.href
  const loc = url.substring(url.lastIndexOf('/') + 1 )
  const reward = (status = true) => { setSuccess(status) }
  
  return(
    <div>
      { success ? 
      <div className="quest-awser-wrap">
        <div className="quest-awser-content">
          <div className="quest-awser-button">
            <div><img src="/quest/star.png" /><span>+ 5</span></div>
            <h2>Good job !</h2>
            <button onClick={ reward.bind(this, false) } className="quest-footer-button questbtn">
              解題討埨區
            </button>
            <button
            onClick={ () => { location.href = `/quests` } } 
            className="quest-footer-button questbtn">題目列表</button>
            <button 
            onClick={ () => { location.href = `/quests/${Number(loc) + 1}` } }
            className="quest-footer-button questbtn">
              下ㄧ題
            </button>
          </div>
        </div>
      </div>
      : null }
      <div> 
        <button className="quest-footer-button questbtn">Reset</button>
        <button className="quest-footer-button questbtn">Submit</button>
        <button onClick={ reward } className="quest-footer-button questbtn">Run</button>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('quest')) {
    ReactDOM.render(
      <Coin />,
      document.getElementById('quest')
    )
  }
})
