import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { API, urlID, Loading } from 'component/lib'
import getCode from 'quest/question'

function QuestResult() {
  const [correctDisplay, setCorrectDisplay] = useState(false)
  const [message, setMessage] = useState(undefined)
  const [isSolved, setIsSolved] = useState(false)
  const [levelCoins, setLevelCoins] = useState([])
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)

  const answer = () => {
    const dockerData = { quest: { type: 'ruby', code: getCode() } }
    const userCoins = { coin_amount: user.coin_amount + levelCoins }
    setLoading(true) 
    API.create(`quests/${urlID()}/answer`, dockerData)
      .then(res => {
        if(res.status == 'Success') {
          setCorrectDisplay(true)
          getUserCoins()
            .then(() => {  
              const apiData = { 
                coin_change: `+${levelCoins}`, 
                description: `答題正確${urlID()}` 
              }
              if(!isSolved) {
                API.create('coins', apiData)
                API.put(`users/${user.id}`, userCoins)
              }
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
    API.get(`users`)
      .then(res => setUser(res))
    API.get(`quests/${urlID()}`)
      .then(quest => {
        let level
        if(quest.level == '簡單') {
          setLevelCoins(5)
          level = 'Easy'
        }else if(quest.level == '中等') {
          setLevelCoins(10)
          level = 'Medium'
        }else {
          setLevelCoins(15)
          level = 'Hard'
        }
        API.get(`quests?status=Success&level[]=${level}`)
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
            <div><img src="/quest/star.jpg" /><span>{ isSolved ? null : `+${levelCoins}` }</span></div>
            <h2>Good job !</h2>
            <button
            onClick={ () => { location.href = `/quests` } } 
            className="line-button quest-footer-button questbtn">題目列表</button>
            <button 
            onClick={ () => { location.href = `/quests/${Number(urlID()) + 1}` } }
            className="quest-footer-button questbtn solid-button next">下一題</button>
            <button className="quest-footer-button questbtn line-button quest-discuss" 
                    onClick={ () => {location.href = `/posts/${urlID()}/answer`} }>
              解題討論區
            </button>
          </div>
        </div>
      </div>
      : null }
      { loading ? <div className="answer-loading"><Loading /></div> : null }
      { message != undefined ?
      <div className={ correctDisplay ? "quest-success-window" : "quest-error-window" }>
        <div>
          <div>
            <span className="tracking-wider">{ correctDisplay ? "成功" : "失敗" }</span>
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
        <button className="line-button quest-footer-button reset questbtn">重置</button>
        <button onClick={ answer } className="solid-button quest-footer-button questbtn submit">送出</button>
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