import React from "react";
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import MDEditor, { commands, ICommand, TextState, TextApi } from '@uiw/react-md-editor'

function App() {
  const [value, setValue] = React.useState("")
  const inputValue = () => {
    const getValue = document.querySelector('.w-md-editor-text-input')
    console.log(getValue.value)
  }

  return (
    <div className="add-discuss">
      <div className="add-discuss-title"><input type="text" row="30" col="30" className="add-discuss-input"/></div>
      <MDEditor
        textareaProps={ {
          placeholder: '可以輸入markdown語法',
          icon: <span style={{ padding: '0 5px' }}>Custom Toolbar</span>
        } }
        value={ value }
        onChange={ inputValue }
        height={ 650 }
      />
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById("add-discuss-container")) {
    ReactDOM.render(<App />, document.getElementById("add-discuss-container"))
  }
})
