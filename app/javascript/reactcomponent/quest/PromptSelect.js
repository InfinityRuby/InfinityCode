import React, { useState } from 'react'
import API from '../lib/API'
import allID from '../lib/ID'

export default function PromptSelect({ prompts, promptsCount, userCoins, useRecord }) {
    return prompts.map((prompt, index) => {
      return <PromptButton key={ prompt.id }
                           hint={ prompt.hint }
                           index={ index }
                           count={ promptsCount }
                           userCoins={ userCoins }
                           useRecord={ useRecord } />
    })
  }
  
  function PromptButton({ hint, index, count, userCoins, useRecord }) {
    const [switchContent, setSwitchContent] = useState(false) 
    const [displayUseCoin, setDisplayUseCoin] = useState(false)
    const userDisplayCoins = document.querySelector('.home-nav-item-link span')

    const useCoins = (status = true) => { setDisplayUseCoin(status) }
    const openContent = (event) => {
      useCoins(false)
      if(event.target.textContent == '免費提示') {
        setSwitchContent(true)
      }else if(event.target.textContent == '確定' && userCoins.coin_amount >= 5) {
        API( '/api/v1/coins', 'POST', { coin_amount: userCoins.coin_amount - 5, 
        coin_change: -5,  description: `使用第${allID()}題的金幣提示` })
        .then(res => res.json())
        .then(post => userDisplayCoins.textContent = post.coin_amount)
        setSwitchContent(true)
      }else {
        alert('金錢不夠')
      }      
    }
  
    return(
      <div>
        { displayUseCoin ? 
        <div className="prompt-wrap">
          <div className="prompt-content">
            <div className="prompt-window">
              <img src="/quest/star.png" />
              <h2>換取提示 : <span>- 5</span> 金幣</h2>
              <button onClick={ useCoins.bind(this, false) } className="quest-footer-button questbtn">
                取消
              </button>   
              <button onClick={ openContent } className="quest-footer-button questbtn">確定</button>
            </div>
          </div>
        </div>
        : null }
        <button className="quest-prompt-button questbtn"
        style={ index == count - 1 ? { background: '#fb9827' } : null} 
        onClick={ index == count - 1 ? (switchContent || useRecord ? null : useCoins) : openContent }>
          { index == count - 1 ? '金幣提示' : '免費提示' }
        </button>
        <p>{ switchContent || useRecord ? hint : null }</p>
      </div>
    )
  }