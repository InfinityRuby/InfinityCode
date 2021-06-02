import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PromptSelect from './PromptSelect'

function Prompt() {
  const [prompts, setPrompts] = useState([])
  const [userCoins, setUserCoins] = useState([])
  const promptsCount = prompts.length
  const url = window.location.href
  const loc = url.substring(url.lastIndexOf('/') + 1 )
  const userDisplayCoins = document.querySelector('.home-nav-item-link span')

  useEffect(() => {
    fetch(`/api/v1/quests/${loc}/prompts`)
    .then(res => res.json())
    .then(post => setPrompts(post))

    fetch(`/api/v1/coins`)
    .then(res => res.json())
    .then(post => setUserCoins(post[post.length - 1]))
  }, [])

  return(
    <div>
      < PromptSelect prompts={ prompts } 
                     promptsCount={ promptsCount } 
                     userCoins={ userCoins } />
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