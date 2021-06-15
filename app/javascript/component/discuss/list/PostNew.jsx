import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import MDEditor from "@uiw/react-md-editor"
import API from "component/lib/API"

function PostNew() {
  const editRef = useRef()
  const titleInputRef = useRef()
  const [anonymous, setAnonymous] = useState(false)
  const [errorWarn, setErrorWarn] = useState(false)

  const anonymousStatus = () => { setAnonymous(!anonymous) }
  const postNew = () => {
    const titleInput = document.querySelector(".post-new-input")
    const contentTextarea = document.querySelector(".w-md-editor-text-input")
    const apiData = {
      title: titleInput.value,
      content: contentTextarea.value, 
      anonymous: anonymous
    }

    if(titleInput.value.length >= 10 && contentTextarea.value.length >= 15){
      API.create("posts", apiData)
        .then(res => location.href = `/posts/${res.id}`)
      editRef.current.style = "background: #ffa100; color: #000"
    }else {
      titleInput.style = "border: 2px solid #f00"
      contentTextarea.style = "border: 2px solid #f00"
      setErrorWarn(true)
    }
  }
  useEffect(() => {
    titleInputRef.current.focus()
  }, [])

  return (
    <div className="post-new-wrap">
      <div className="post-new-title">
        { errorWarn ? <div style={{ color: "#f00" }}>欄位必須填，至少10個字</div> : null }
        <input type="text" row="30" col="30" className="post-new-input" ref={ titleInputRef } placeholder="文章標題，至少輸入10個字"/>
      </div>
      <div className="anonymous">
        <input type="checkbox" name="anonymous" id="anonymous" value="匿名發送貼文" onClick={ anonymousStatus } />
        <label htmlFor="anonymous">
          <span className="checkbox-value-anonymous">匿名發送貼文</span>
        </label>
      </div>
      <MDEditor
        textareaProps={ {
          placeholder: "可以輸入markdown語法，內容至少15個字",
          icon: <span style={{ padding: "0 5px" }}>Custom Toolbar</span>
        } }
        height={ 550 }
      />
      <div className="post-new-button-wrap">
        <button className="post-new-button solid-button" onClick={ postNew } ref={ editRef }>送出</button>
      </div>
    </div>
  )
}

document.addEventListener("turbolinks:load", () => {
  const postNew = document.getElementById("post-new-container")
  if(postNew) {
    ReactDOM.render(<PostNew />, postNew)
  }
})