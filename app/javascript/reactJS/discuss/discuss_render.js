import React from 'react'
import ReactDOM from 'react-dom'
import Discuss from './discuss'

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('discuss-wrap')){
    ReactDOM.render(
      <Discuss />,
      document.getElementById('discuss-wrap')
    )
  }
})