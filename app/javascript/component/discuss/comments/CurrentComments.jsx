import React, { useState, useRef } from 'react'
import { CommentsAction, commentsID } from './CommentsAciton'
import API from 'component/lib/API'
import marked from 'marked'

export default function CurrentComments({ comments, loginUser }) {
  return comments.map(comment => {
    const { id, author, content, created_at } = comment
    return <UserComments key={ id } 
                         id={ id }
                         author={ author } 
                         content={ content }
                         loginUser={ loginUser }
                         created={ created_at } />                       
  })
}

function UserComments({ id, author, content, created, loginUser }) {
  const { email, name, avatar } = author
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
        <span>{ created.slice(0, 10) }</span>
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
                        email={ email } 
                        loginUser={ loginUser } />
      </div>
    </div>
  )  
}