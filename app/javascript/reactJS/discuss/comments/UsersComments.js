import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import marked from 'marked'

export default function UserComments(props) {
  const comments = props
  const commentRef = useRef()
  const url = window.location.href
  const postID = url.substring(url.lastIndexOf('/') + 1)

  function CommentsAction() { 
    const postAPI = () => {
      const token = document.querySelector('meta[name=csrf-token]').content
      const commentsID = commentRef.current.dataset.id
      const apiData = { content: '拜託一定要完成' }
      const API = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token
        },
        body: JSON.stringify(apiData)
      }
      fetch(`/api/v1/posts/${postID}/comments/${commentsID}`, API)  
      setTimeout(() => location.href = `/posts/${postID}`, 200)
    }
    const postCreate = () => {
      const commentTexarea = document.getElementById('comment-texarea').value
      const apiData = { content: commentTexarea }
      const token = document.querySelector('meta[name=csrf-token]').content
      const commentsID = commentRef.current.dataset.id
      const API = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token
        },
        body: JSON.stringify(apiData)
      }
      fetch(`/api/v1/posts/${postID}/comments`, API)  
      setTimeout(() => location.href = `/posts/${postID}`, 200)
    }
      return(
        <div className="user-comments-action">
          <button onClick={ postAPI }>編輯</button>
          <button onClick={ postCreate }>新增</button>
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
      <div className="single-article-user-content">
        <div className="single-article-content-markdown markdown-body" dangerouslySetInnerHTML={ {__html: marked(comments.content)} }></div>
        <CommentsAction />
      </div>
    </div>
  )  
}