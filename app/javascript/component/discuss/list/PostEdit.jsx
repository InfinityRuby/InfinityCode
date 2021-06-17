import React, { useEffect, useState, useRef } from "react"
import ReactDOM from "react-dom"
import MDEditor from "@uiw/react-md-editor"
import { API, urlID } from "component/lib"

function PostEdit() {
  const [errorWarn, setErrorWarn] = useState(false)
  const editRef = useRef()
  
  useEffect(() => {
    const titleInput = document.querySelector(".post-edit-input")
    const contentTextarea = document.querySelector(".w-md-editor-text-input")
    API.get(`posts/${urlID("edit")}`)
      .then(res => {  
        titleInput.value = res.title
        contentTextarea.value = res.content
      })            
  }, [])
  
  const postEdit = () => {
    const titleInput = document.querySelector(".post-edit-input")
    const contentTextarea = document.querySelector(".w-md-editor-text-input")
    const apiData = { title: titleInput.value, content: contentTextarea.value }
    
    if(titleInput.value.length >= 8 && titleInput.value.length <= 20 && 
      contentTextarea.value.length >= 10 && contentTextarea.value.length <= 300){
      API.put(`posts/${urlID("edit")}`, apiData)
      editRef.current.style = "background: #ffa100; color: #000"
      location.href = `/posts/${urlID("edit")}`
    }else {
      titleInput.style = "border: 2px solid #f00"
      contentTextarea.style = "border: 2px solid #f00"
      setErrorWarn(true)  
    }
  }

  return (
    <div className="post-edit-wrap">
      <div className="post-edit-title">
        { errorWarn ? <div style={{ color: "#f00" }}>標題8~20個字，內容10~300個字</div> : null }
        <input type="text" row="30" col="30" className="post-edit-input" placeholder="文章標題，至少輸入8個字"/>
      </div>
      <MDEditor
        textareaProps={ {
          placeholder: "可輸入markdown語法，至少10個字",
          icon: <span style={{ padding: "0 5px" }}>Custom Toolbar</span>
        } }
        height={ 550 }
      />
      <div className="post-edit-button-wrap">
        <button className="post-edit-button solid-button" ref={ editRef } onClick={ postEdit }>送出</button>
      </div>
    </div>
  )
}

document.addEventListener("turbolinks:load", () => {
  const postEdit = document.getElementById("post-edit-container")
  if(postEdit) {
    ReactDOM.render(<PostEdit />, postEdit)
  }
})