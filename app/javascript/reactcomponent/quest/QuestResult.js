import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import API from '../discuss/lib/API'

function Coin() {
  const [success, setSuccess] = useState(false)
  const [userCoins, setUserCoins] = useState([])
  const url = window.location.href
  const loc = url.substring(url.lastIndexOf('/') + 1 )
  const reward = (status = true) => { 
    setSuccess(status)
    API('POST', { coin_amount: userCoins.coin_amount + 5, 
    coin_change: +5, description: "答題正確" }, 'coins')
  }
  
  useEffect(() => {
    fetch('/api/v1/coins')
    .then(res => res.json())
    .then(post => {
      setUserCoins(post[post.length - 1])
    })
  }, [])
  
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
              下一題
            </button>
          </div>
        </div>
      </div>
      : null }
      <div> 
        <button className="quest-footer-button questbtn">重置</button>
        <button onClick={ reward } className="quest-footer-button questbtn">送出</button>
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