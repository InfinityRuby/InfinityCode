import React from 'react'
import ReactDOM from 'react-dom'
import Comments from './Comments'

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('single-article-user-comments')){
    ReactDOM.render(
      <Comments />,
      document.getElementById('single-article-user-comments')
    )
  }
})