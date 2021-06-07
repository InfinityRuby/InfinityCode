import React, { useState, useRef } from 'react'
import { CommentsAction, commentsID } from './CommentsAciton'
import API from 'component/lib/API'
import marked from 'marked'

export default function UserComments({ id, author, content, loginUser }) {
  const { name, avatar } = author
  const [currentComment, setCurrentComment] = useState(0)
  const commentRef = useRef()
  const editInput = document.querySelector(`.single-article-comments-${currentComment} p`)

  const editNewComment = event => {  
    if(event.key == 'Enter' && event.target.value != '') {
      const apiData =  { content: event.target.value }

      API.put(`comments/${commentsID(commentRef)}`, apiData)
        .then(() => {
          setCurrentComment(0)
          document.querySelector(`.single-article-comments-${commentsID(commentRef)} p`)
          .textContent = event.target.value
        })
    }
  }

  return(
    <div data-id={ id } ref={ commentRef } className="single-article-user-comments">
      <div className="single-article-user-title">
        <img src={ avatar } alt="comments-img" />
        <h4 style={{ color: 'green' }}>{ name }</h4>
      </div>
      <div className="single-article-user-content" >
        { currentComment == id 
          ? 
          <input className="single-article-single-input" type="text" 
                 defaultValue={ editInput ? editInput.textContent : null } 
                 id={ id } onKeyPress={ editNewComment } /> 
          :
          <div className={ `single-article-comments-${id} single-article-content-markdown markdown-body` } dangerouslySetInnerHTML={ {__html: marked(content)} }></div>
        }
        <CommentsAction commentRef= { commentRef } 
                        setCurrentComment= { setCurrentComment } 
                        currentComment = { currentComment } 
                        name={ name } 
                        loginUser={ loginUser } />
      </div>
    </div>
  )  
}