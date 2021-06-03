import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PromptSelect from './PromptSelect'
import API from '../lib/API'
import allID from '../lib/ID'

function Prompt() {
  const [prompts, setPrompts] = useState([])
  const [userCoins, setUserCoins] = useState([])
  const [useRecord, setUseRecord] = useState([])
  const promptsCount = prompts.length

  useEffect(() => {
    API(`/api/v1/quests/${allID()}/prompts`)
    .then(post => setPrompts(post))

    API(`/api/v1/coins`)
    .then(post => {
      setUseRecord(post.find(el => el.description == `使用第${allID()}題的金幣提示`))
      setUserCoins(post[post.length - 1])
    })
  }, [])

  return(
    <div>
      <PromptSelect prompts={ prompts } 
                    promptsCount={ promptsCount } 
                    userCoins={ userCoins }
                    useRecord={ useRecord } />
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('prompt')) {
    ReactDOM.render(
      <Prompt />,
      document.getElementById('prompt')
    )
  }
})