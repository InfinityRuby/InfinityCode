import React from 'react'
import ReactDOM from 'react-dom'
import Comments from './Comments'

document.addEventListener('turbolinks:load', () => {
  const userComments = document.getElementById('single-article-user-comments')
  if(userComments){
    ReactDOM.render(
      <Comments />,
      userComments
    )
  }
})