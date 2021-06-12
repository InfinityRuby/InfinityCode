import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PromptSelect from './PromptButton'
import { API, urlID } from 'component/lib'

function Prompt() {
  const [prompts, setPrompts] = useState([])
  const [userCoins, setUserCoins] = useState([])
  const [useRecord, setUseRecord] = useState([])
  const promptsCount = prompts.length

  useEffect(() => {
    API.get(`quests/${urlID()}/prompts`)
      .then(res => setPrompts(res))
      
    API.get(`coins`)
    .then(res => {
      setUseRecord(res.find(el => el.description == `使用第${urlID()}題的金幣提示`))
      setUserCoins(res[res.length - 1])
    })
  }, [])

  return(
    <div>
      <PromptSelect prompts={ prompts } 
                    promptsCount={ promptsCount } 
                    userCoins={ userCoins }
                    useRecord={ useRecord }
                    setUseRecord={ setUseRecord } />
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  const prompt = document.getElementById('prompt')
  if(prompt) {
    ReactDOM.render(
      <Prompt />,
      prompt
    )
  }
})