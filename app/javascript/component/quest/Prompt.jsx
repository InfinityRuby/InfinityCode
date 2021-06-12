import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PromptSelect from './PromptButton'
import { API, urlID } from 'component/lib'

function Prompt() {
  const [prompts, setPrompts] = useState([])
  const [useRecord, setUseRecord] = useState([])
  const [user, setUser] = useState(0)
  const promptsCount = prompts.length

  useEffect(() => {
    API.get(`quests/${urlID()}/prompts`)
      .then(res => setPrompts(res))
  }, [useRecord])

  useEffect(() => {
    API.get(`coins`)
      .then(res => {
        setUseRecord(res.find(el => el.description == `使用第${urlID()}題的金幣提示`))
      })

    API.get(`users`)
      .then(res => setUser(res))
  }, [])

  return(
    <div>
      <PromptSelect prompts={ prompts } 
                    promptsCount={ promptsCount } 
                    useRecord={ useRecord }
                    setUseRecord={ setUseRecord }
                    user={ user } />
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