import React, { useState, useRef } from 'react'
import API from '../lib/API'
import marked from 'marked'

export default function UserComments({ id, email, content, create }) {
  const commentRef = useRef()
  const [currentComment, setCurrentComment] = useState(0)
  const editInput = document.querySelector(`.single-article-comments-${currentComment} p`)
  let loginUser = document.querySelector('.user-account > a').textContent
  email = `${email}`.substring(0, `${email}`.lastIndexOf('@'))
  loginUser = `${loginUser}`.substring(0, `${loginUser}`.lastIndexOf('@'))

  const editNewComment = (event) => {   
    const commentsID = commentRef.current.dataset.id
    if(event.key == 'Enter' && event.target.value != '') {
      API('PUT', { content: event.target.value }, 'editComment', commentsID)
      setCurrentComment(0)
      setTimeout(() => {
        document.querySelector(`.single-article-comments-${commentsID} p`).textContent = event.target.value
      }, 0) 
    }
  }

  function CommentsAction() {   
    const editComment = () => {  
      const commentsID = commentRef.current.dataset.id
      setCurrentComment(commentsID)
      setTimeout(() => { document.getElementById(`${commentsID}`).focus() }, 0)
    }

    const destroyComment = () => {    
      const commentsID = commentRef.current.dataset.id
        if(confirm('確認要刪除這則留言？')) {
          commentRef.current.style = 'display: none'
          API('DELETE', '', 'destroyComment', commentsID)
        } 
      }
    const cancelEditComment = () => {
      setCurrentComment(0)
    }
    return(
      <div className="user-comments-action">
        { currentComment 
        ? 
        <button onClick={ cancelEditComment }>取消</button> 
        : 
        <div>
        { `${email}` == `${loginUser}` ? <button onClick={ editComment }>編輯</button> : null }   
        { `${email}` == `${loginUser}` ? <button onClick={ destroyComment }>刪除</button> : null }
        </div> 
        }
      </div>
    )
  }

  return(
    <div data-id={ id } ref={ commentRef } className="single-article-user-comments">
      <div className="single-article-user-title">
        <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
        <h4>{ email }</h4>
        <span>{ `${create}`.slice(0, 10) }</span>
      </div>
      <div className="single-article-user-content" >
        { currentComment == id 
          ? 
          <input className="single-article-single-input" type="text" defaultValue={ editInput ? editInput.textContent : null } id={ id } onKeyPress={ editNewComment } /> 
          :
          <div className={ `single-article-comments-${id} single-article-content-markdown  markdown-body` } dangerouslySetInnerHTML={ {__html: marked(content)} }></div>
        }
        <CommentsAction />
      </div>
    </div>
  )  
}