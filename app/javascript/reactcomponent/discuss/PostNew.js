import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom"
import MDEditor from '@uiw/react-md-editor'
import API from "./lib/API";

function PostNew() {
  const editRef = useRef()
  const titleInputRef = useRef()
  const [unknown, setUnknown] = useState(false)

  const unknownStatus = () => { setUnknown(!unknown) }
  const postNew = () => {
    const titleValue = document.querySelector('.post-new-input')
    const contentValue = document.querySelector('.w-md-editor-text-input')
    API('POST', { title: titleValue.value, content: contentValue.value, unknown: unknown }, 'newPost')
    editRef.current.style = 'background: #ffa100; color: #000'
    location.href = "/posts"
  }
  useEffect(() => {
    titleInputRef.current.focus()
  }, [])

  return (
    <div className="post-new-wrap">
      <div className="post-new-title">
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
