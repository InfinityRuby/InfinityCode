import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom"
import MDEditor from '@uiw/react-md-editor'
import API from "../lib/API";

function PostNew() {
  const editRef = useRef()
  const titleInputRef = useRef()
  const [unknown, setUnknown] = useState(false)
  const [errorWarn, setErrorWarn] = useState(false)

  const unknownStatus = () => { setUnknown(!unknown) }
  const postNew = () => {
    const titleInput = document.querySelector('.post-new-input')
    const contentTextarea = document.querySelector('.w-md-editor-text-input')
    if(titleInput.value.length >= 6 && contentTextarea.value.length >= 6){
      API('POST', { title: titleInput.value, content: contentTextarea.value, unknown: unknown }, 'newPost')
      editRef.current.style = 'background: #ffa100; color: #000'
      location.href = "/posts"
    }else {
      titleInput.style = 'border: 2px solid #f00'
      contentTextarea.style = 'border: 2px solid #f00'
      setErrorWarn(true)
    }
  }
  useEffect(() => {
    titleInputRef.current.focus()
  }, [])

  return (
    <div className="post-new-wrap">
      <div className="post-new-title">
        { errorWarn ? <div style={{ color: "#f00" }}>欄位必須填，至少6個字</div> : null }
        <input type="text" row="30" col="30" className="post-new-input" ref={ titleInputRef } />
      </div>
      <div className="unknown">
        <input type="checkbox" name="unknown" id="unknown" value="匿名發送貼文" onClick={ unknownStatus } />
        <label htmlFor="unknown">
          <span className="checkbox-value-unknown">匿名發送貼文</span>
        </label>
      </div>
      <MDEditor
        textareaProps={ {
          placeholder: '可以輸入markdown語法',
          icon: <span style={{ padding: '0 5px' }}>Custom Toolbar</span>
        } }
        height={ 550 }
      />
      <div className="post-new-button-wrap">
        <button className="post-new-button" onClick={ postNew } ref={ editRef }>送出</button>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById("post-new-container")) {
    ReactDOM.render(<PostNew />, document.getElementById("post-new-container"))
  }
})