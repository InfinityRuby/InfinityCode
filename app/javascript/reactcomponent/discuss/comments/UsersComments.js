import React, { useState, useRef } from 'react'
import { CommentsAction, commentsID } from './CommentsAciton'
import API from '../lib/API'
import allID from '../lib/ID'
import marked from 'marked'

export default function UserComments({ id, email, content, createTime, loginUser }) {
  const commentRef = useRef()
  const [currentComment, setCurrentComment] = useState(0)
  const editInput = document.querySelector(`.single-article-comments-${currentComment} p`)

  const editNewComment = (event) => {   
    if(event.key == 'Enter' && event.target.value != '') {
      API('PUT', { content: event.target.value },
      `posts/${allID('post')}/comments/${commentsID(commentRef)}`)
      setCurrentComment(0)
      setTimeout(() => {
        document.querySelector(`.single-article-comments-${commentsID(commentRef)} p`)
        .textContent = event.target.value
      }, 0) 
    }
  }

  return(
    <div data-id={ id } ref={ commentRef } className="single-article-user-comments">
      <div className="single-article-user-title">
        <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
        <h4 style={{ color: 'green' }}>{ email }</h4>
        <span>{ `${createTime}`.slice(0, 10) }</span>
      </div>
      <div className="single-article-user-content" >
        { currentComment == id 
          ? 
          <input className="single-article-single-input" type="text" defaultValue={ editInput ? editInput.textContent : null } id={ id } onKeyPress={ editNewComment } /> 
          :
          <div className={ `single-article-comments-${id} single-article-content-markdown markdown-body` } dangerouslySetInnerHTML={ {__html: marked(content)} }></div>
        }
        <CommentsAction commentRef= { commentRef } 
                        setCurrentComment= { setCurrentComment } 
                        currentComment = { currentComment } 
                        email={ email } 
                        loginUser={ loginUser } />
      </div>
    </div>
  )  
}