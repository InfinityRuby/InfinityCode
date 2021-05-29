import React, { useRef } from "react";
import ReactDOM from "react-dom"
import MDEditor from '@uiw/react-md-editor'
import API from "./lib/API";

function PostNew() {
  const editRef = useRef()
  const postNew = () => {
    const titleValue = document.querySelector('.post-new-input')
    const contentValue = document.querySelector('.w-md-editor-text-input')
    API('POST', 'postNew', titleValue.value, contentValue.value)
    editRef.current.style = 'background: #ffa100; color: #000'
    location.href = '/posts'
  }

  return (
    <div className="post-new-wrap">
      <div className="post-new-title">
        <input type="text" row="30" col="30" className="post-new-input"/>
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
