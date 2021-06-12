import React, { useEffect, useState } from 'react'
import { API, urlID } from 'component/lib'
import marked from 'marked'

export default function PromptSelect({ prompts, promptsCount, user, useRecord, setUseRecord }) {
  return prompts.map((prompt, index) => {
    const { id, hint } = prompt
    return <PromptButton key={ id }
                         hint={ hint }
                         index={ index }
                         count={ promptsCount }
                         user={ user }
                         useRecord={ useRecord }
                         setUseRecord={ setUseRecord } />
  })
}
  
  function PromptButton({ hint, index, count, user, useRecord, setUseRecord }) {
    const [switchContent, setSwitchContent] = useState(false) 
    const [displayWindow, setDisplayWindow] = useState(false)

    const clickPrompt = () => {
      const currentCoins = document.querySelector('.home-nav-item-link span')
      const userAPI = { coin_amount: user.coin_amount - 5, }
      const apiData = { 
        coin_change: -5,  
        description: `使用第${urlID()}題的金幣提示`
      }
      
      if(index != count - 1) {
        setSwitchContent(!switchContent)
      }else if(index == count - 1 && user.coin_amount >= 5) {
        API.create('coins', apiData)
          .then(res => {
            if(!useRecord) {
              API.put(`users/${user.id}`, userAPI)
              currentCoins.textContent = user.coin_amount - 5
              setUseRecord(res)
            }
            setDisplayWindow(false)    
          })
        setSwitchContent(!switchContent)
      }else {
        alert('金錢不夠')
      }  
    }
    return(
      <div>
        { displayWindow ? 
        <div className="prompt-wrap">
          <div className="prompt-content">
            <div className="prompt-window">
              <img src="/quest/star.png" />
              <h2>換取提示 : <span>- 5</span> 金幣</h2>
              <button onClick={ () => {setDisplayWindow(false)} } className="quest-footer-button questbtn">
                取消
              </button>   
              <button onClick={ clickPrompt } className="quest-footer-button questbtn">
                確定
              </button>
            </div>
          </div>
        </div>
        : null }
        <button className="quest-prompt-button questbtn"
                style={ index == count - 1 ? { background: '#fb9827' } : null} 
                onClick={ index == count - 1 ? 
                (useRecord ? clickPrompt : setDisplayWindow.bind(false)) : clickPrompt }>
          { index == count - 1 ? '金幣提示' : '免費提示' }
        </button>
        <div className="markdown-body" 
             dangerouslySetInnerHTML={{ __html: switchContent ? marked(hint) : null }}></div>
      </div>
    )
  }