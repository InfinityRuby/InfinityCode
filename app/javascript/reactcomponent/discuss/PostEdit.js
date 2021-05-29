import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom"
import MDEditor from '@uiw/react-md-editor'
import API from "./lib/API";
import allID from "./lib/ID"

function PostEdit() {
  const [editValueAPI, setEditValueAPI] = useState([])
  const editRef = useRef()
  
  useEffect(() => {
    fetch(`/jsons/data`)
    .then(res => res.json())
    .then(post => {
      const titleValue = document.querySelector('.post-edit-input')
      const contentValue = document.querySelector('.w-md-editor-text-input')
      const currentPostID = post.filter(item => item.id == allID('edit'))[0]  
      titleValue.value = currentPostID.title
      contentValue.value = currentPostID.content
      setEditValueAPI(currentPostID)
    })            
  }, [])
  
  const postEdit = () => {
    const titleValue = document.querySelector('.post-edit-input')
    const contentValue = document.querySelector('.w-md-editor-text-input') 
    API('PUT', {title: titleValue.value, content: contentValue.value}, 'editPost')
    editRef.current.style = 'background: #ffa100; color: #000'
    location.href = `/posts/${allID('edit')}`
  }

  return (
    <div className="post-edit-wrap">
      <div className="post-edit-title">
        <input type="text" row="30" col="30" className="post-edit-input" />
      </div>
      <MDEditor
        textareaProps={ {
          placeholder: '可輸入markdown語法',
          icon: <span style={{ padding: '0 5px' }}>Custom Toolbar</span>
        } }
        height={ 550 }
      />
      <div className="post-edit-button-wrap">
        <button className="post-edit-button" ref={ editRef } onClick={ postEdit }>送出</button>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById("post-edit-container")) {
    ReactDOM.render(<PostEdit />, document.getElementById("post-edit-container"))
  }
})
