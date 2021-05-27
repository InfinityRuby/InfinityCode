import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import marked from 'marked'

export default function UserComments(props) {
  const comments = props
  const commentRef = useRef()
  const [currentComment, setCurrentComment] = useState(0)
  const url = window.location.href
  const postID = url.substring(url.lastIndexOf('/') + 1)
  const token = document.querySelector('meta[name=csrf-token]').content

  const editNewComment = (event) => {   
    if(event.key == 'Enter' && event.target.value != '') {
      const apiData = { content: event.target.value }
      const commentsID = commentRef.current.dataset.id
      const editCommentAPI = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token
        },
        body: JSON.stringify(apiData)
      }
      fetch(`/api/v1/posts/${postID}/comments/${commentsID}`, editCommentAPI)  
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
      const destroyCommentAPI = {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': token
        }
      }
      if(confirm('確認要刪除這則留言？')) {
        commentRef.current.style = 'display: none'
        fetch(`/api/v1/posts/${postID}/comments/${commentsID}`, destroyCommentAPI)
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
          <button onClick={ editComment }>編輯</button>
          <button onClick={ destroyComment }>刪除</button>
        </div> 
        }
      </div>
    )
  }

  return(
    <div data-id={ comments.id } ref={ commentRef } className="single-article-user-comments">
      <div className="single-article-user-title">
        <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
        <h4>王小明</h4>
        <span>0</span>
        <span>a few seconds ago</span>
      </div>
      <div className="single-article-user-content" >
        { currentComment == comments.id 
          ? 
          <input className="single-article-single-input" type="text" defaultValue={ document.querySelector(`.single-article-comments-${currentComment} p`).textContent } id={ comments.id } onKeyPress={ editNewComment } /> 
          :
          <div className={ `single-article-comments-${comments.id} single-article-content-markdown  markdown-body` } dangerouslySetInnerHTML={ {__html: marked(comments.content)} }></div>
        }
        <CommentsAction />
      </div>
    </div>
  )  
}