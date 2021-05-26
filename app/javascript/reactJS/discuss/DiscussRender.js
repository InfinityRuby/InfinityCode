import React from 'react'
import ReactDOM from 'react-dom'
import Discuss from './Discuss'

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('discuss-wrap')){
    ReactDOM.render(
      <Discuss />,
      document.getElementById('discuss-wrap')
    )
  }
})