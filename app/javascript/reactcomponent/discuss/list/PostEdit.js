import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom"
import MDEditor from '@uiw/react-md-editor'
import API from "../../lib/API";
import allID from "../../lib/ID"

function PostEdit() {
  const [errorWarn, setErrorWarn] = useState(false)
  const editRef = useRef()
  
  useEffect(() => {
    const titleInput = document.querySelector('.post-edit-input')
    const contentTextarea = document.querySelector('.w-md-editor-text-input')
    API(`/api/v1/posts/${allID('edit')}`)
    .then(post => {  
      titleInput.value = post.title
      contentTextarea.value = post.content
    })            
  }, [])
  
  const postEdit = () => {
    const titleInput = document.querySelector('.post-edit-input')
    const contentTextarea = document.querySelector('.w-md-editor-text-input')
    if(titleInput.value.length >= 6 && contentTextarea.value.length >= 6){
      API(`/api/v1/posts/${allID('edit')}`, 'PUT', 
      { title: titleInput.value, content: contentTextarea.value })
      editRef.current.style = 'background: #ffa100; color: #000'
      location.href = `/posts/${allID('edit')}`
    }else {
      titleInput.style = 'border: 2px solid #f00'
      contentTextarea.style = 'border: 2px solid #f00'
      setErrorWarn(true)  
    }
  }

  return (
    <div className="post-edit-wrap">
      <div className="post-edit-title">
        { errorWarn ? <div style={{ color: "#f00" }}>欄位必須填，至少6個字</div> : null }
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