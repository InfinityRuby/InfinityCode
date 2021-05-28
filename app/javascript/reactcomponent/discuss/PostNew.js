import React from "react";
import ReactDOM from "react-dom"
import MDEditor, { commands, ICommand, TextState, TextApi } from '@uiw/react-md-editor'
import { api, postID } from "./lib/api";

function AddDiscuss() {
  const [value, setValue] = React.useState("")

  const postNew = () => {
    const titleValue = document.querySelector('.post-new-input')
    const contentValue = document.querySelector('.w-md-editor-text-input')
    api('POST', 'postNew', titleValue.value, contentValue.value)
    location.href = '/posts'
  }

  return (
    <div className="post-new-wrap">
      <div className="post-new-title"><input type="text" row="30" col="30" className="post-new-input"/></div>
      <MDEditor
        textareaProps={ {
          placeholder: '可以輸入markdown語法',
          icon: <span style={{ padding: '0 5px' }}>Custom Toolbar</span>
        } }
        value={ value }
        height={ 550 }
      />
      <div className="post-new-button-wrap"><button className="post-new-button" onClick={ postNew }>送出</button></div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById("post-new-container")) {
    ReactDOM.render(<AddDiscuss />, document.getElementById("post-new-container"))
  }
})
