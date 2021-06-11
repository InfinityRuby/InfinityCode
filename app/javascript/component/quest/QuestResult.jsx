import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { API, urlID, Loading } from 'component/lib'
import getCode from 'quest/question'

function QuestResult() {
  const [correctDisplay, setCorrectDisplay] = useState(false)
  const [message, setMessage] = useState(undefined)
  const [isSolved, setIsSolved] = useState(false)
  const [loading, setLoading] = useState(false)

  const answer = () => {
    const dockerData = { quest: { type: 'ruby', code: getCode() } }
    setLoading(true) 
    API.create(`quests/${urlID()}/answer`, dockerData)
      .then(res => {
        if(res.status == 'Success') {
          setCorrectDisplay(true)
          getUserCoins()
            .then(res => {  
              const apiData = { 
                coin_amount: res.coin_amount + 5, 
                coin_change: +5, 
                description: `答題正確${urlID()}` 
              }
              isSolved ? null : API.create('coins', apiData)
            })
        }
        setMessage(res)
        setLoading(false)
      })
  }

  const getUserCoins = () => {
    return API.get('coins')
    .then(res => {
      return res[res.length - 1]
    })
  }
  
  useEffect(() => {
    getUserCoins()
    API.get(`quests/${urlID()}`)
      .then(quest => {
        API.get(`quests?status=Success&level[]=${quest.level}`)
          .then(quests => {
            const currentQuest = quests.find(el => el.id == urlID())
            setIsSolved(currentQuest.is_solved)
          })
      })
  }, [])
  
  return(
    <div>
      { correctDisplay ? 
      <div className="quest-answer-wrap">
        <div className="quest-answer-content">
          <div className="quest-answer-button">
            <div><img src="/quest/star.png" /><span>{ isSolved ? null : '+ 5' }</span></div>
            <h2>Good job !</h2>
            <button className="quest-footer-button questbtn">解題討論區</button>
            <button
            onClick={ () => { location.href = `/quests` } } 
            className="quest-footer-button questbtn">題目列表</button>
            <button 
            onClick={ () => { location.href = `/quests/${Number(urlID()) + 1}` } }
            className="quest-footer-button questbtn">下一題</button>
          </div>
        </div>
      </div>
      : null }
      { loading ? <div className="answer-loading"><Loading /></div> : null }
      { message != undefined ?
      <div className={ correctDisplay ? "quest-success-window" : "quest-error-window" }>
        <div>
          <div>
            <span className="tracking-wider">{ correctDisplay ? "Success" : "Error" }</span>
          </div>
          <div onClick={ () => { setMessage(undefined) } }>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <MessageWindow output={ message.output } 
                       input={ message.input } 
                       expected={ message.expected } />
      </div>   
      : null }

      <div>
        <button className="quest-footer-button questbtn">重置</button>
        <button onClick={ answer } className="quest-footer-button questbtn">送出</button>
      </div> 
    </div>
  )
}

function MessageWindow({ output, input, expected }) {
  return (
    <div className="display-message-wrap">
      <div className="display-message">
        <div>Your input :</div>
        <div>{ input.map((intput, index) => <p key={ index }>{ intput }</p>) }</div>
      </div>
      <div className="display-message">
        <div>Output :</div>
        <div>{ output.map((output, index) => <p key={ index }>{ output }</p>) }</div>
      </div>
      <div className="display-message">
        <div>Expected :</div>
        <div>{ expected.map((expected, index) => <p key={ index }>{ expected }</p>) }</div>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  const quest = document.getElementById('quest')
  if(quest) {
    ReactDOM.render(
      <QuestResult />,
      quest
    )
  }
})