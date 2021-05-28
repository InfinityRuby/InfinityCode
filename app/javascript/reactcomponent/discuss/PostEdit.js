import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"
import MDEditor from '@uiw/react-md-editor'
import api from "./lib/api";
import { url2 } from "./lib/url"

function PostEdit() {
  const [editValueAPI, setEditValueAPI] = useState([]) 
  
  useEffect(() => {
    fetch(`/jsons/data`)
    .then(res => res.json())
    .then(post => {
      const titleValue = document.querySelector('.post-edit-input')
      const contentValue = document.querySelector('.w-md-editor-text-input')
      const currentPostID = post.filter(item => item.id == url2())[0]  
      titleValue.value = currentPostID.title
      contentValue.value = currentPostID.content
      setEditValueAPI(currentPostID)
    })            
  }, [])
  
  const postEdit = () => {
    const titleValue = document.querySelector('.post-edit-input')
    const contentValue = document.querySelector('.w-md-editor-text-input') 
    api('PUT', 'postEdit', titleValue.value, contentValue.value)
    location.href = `/posts/${url2()}`
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
          <button className="post-edit-button" onClick={ postEdit }>送出</button>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById("post-edit-container")) {
    ReactDOM.render(<PostEdit />, document.getElementById("post-edit-container"))
  }
})
