import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import API from '../lib/API'
import allID from '../lib/ID'
import getCode from '../../quest/question'

function Coin() {
  const [correctDisplay, setCorrectDisplay] = useState(false)
  const [displayCoins, setDisplayCoins] = useState(0)
  const userDisplayCoins = document.querySelector('.home-nav-item-link span')
  const [animation, setAnimation] = useState(true)
  const reward = () => { 
    setAnimation(false)
    setTimeout(() => {setAnimation(true)}, 700)
    API(`/api/v1/quests/${allID()}/answer`, 'POST', { quest: { type: 'ruby', code: getCode() } })
    .then(res => res.json())
    .then(post => {
      if(post.status == 'Success') {
        setCorrectDisplay(true)
        getUserCoins()
        .then(post => {  
          API( '/api/v1/coins', 'POST', { coin_amount: post.coin_amount + 5, 
          coin_change: +5, description: `答題正確${displayCoins}` })
          .then(res => res.json())
          .then(post => userDisplayCoins.textContent = post.coin_amount)
        })
      }
    })
  }

  const getUserCoins = () => {
    return API('/api/v1/coins')
    .then(post => {
      setDisplayCoins(allID())
      return post[post.length - 1]
    })
  }
  
  useEffect(() => {
    getUserCoins()
  }, [])
  
  return(
    <div>
      { correctDisplay ? 
      <div className="quest-answer-wrap">
        <div className="quest-answer-content">
          <div className="quest-answer-button">
            <div><img src="/quest/star.png" /><span>+ 5</span></div>
            <h2>Good job !</h2>
            <button className="quest-footer-button questbtn">
              解題討埨區
            </button>
            <button
            onClick={ () => { location.href = `/quests` } } 
            className="quest-footer-button questbtn">題目列表</button>
            <button 
            onClick={ () => { location.href = `/quests/${Number(allID()) + 1}` } }
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