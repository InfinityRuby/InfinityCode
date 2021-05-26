import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { useEffect, useState, useRef } from 'react'

export default function UserComments(props) {
  const comments = props
  const commentRef = useRef()
  const [selectOption, setSelectOption] = useState('')

  function DeletePost() { 
  const APIDestroy = () => {
    const token = document.querySelector('meta[name=csrf-token]').content
    const id = commentRef.current.dataset.id
    let url = window.location.href
    let localID = url.substring(url.lastIndexOf('/') + 1)
    const API = {
      method: 'PUT',
      headers: {
        'X-CSRF-Token' : token
      }
    }
  
    confirm('確認刪除嗎？')
    fetch(`/posts/${localID}/comments/${id}`, API)
    .then(res => res.json())
    .then(posts => {
      console.log(posts)
    })
      setTimeout(() => location.href = "/posts", 200)
    }
    return(
      <button onClick={APIDestroy}>刪除這篇文章按鈕</button>
    )
  }
  return(
    <div data-id={comments.id} ref={commentRef} className="single-article-user-comments">
        <div className="single-article-user-title">
            <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
            <h4>王小明</h4>
            <span>0</span>
            <span>a few seconds ago</span>
        </div>
        <div>
        <div className="single-article-user-content markdown-body" dangerouslySetInnerHTML={{__html:  marked(comments.content)}}></div>
        </div>
        <DeletePost />
    </div>
  )  
}