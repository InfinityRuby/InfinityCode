import React from 'react'
import ReactDOM from 'react-dom'

function Billboard() {
  const switchPage = (event) => {
    document.querySelectorAll('.billboard-pages > div').forEach(page => {
      page.style = 'opacity: 40%; background: #f3f4f6;'
      event.target.style = 'opacity: 80%; background: #fff;'
    })
  }
  return(
    <div className="billboard-wrap">
      <div className="billboard-pages">
        <div onClick={ switchPage }>解題數</div>
        <div onClick={ switchPage }>金幣數</div>
        <div onClick={ switchPage }>得讚數</div>
        <div onClick={ switchPage }>發文數</div>
      </div>
      <div className="billboard-body">
        <div className="billboard-title">
          <div>排名</div>
          <div>使用者</div>
          <div>得分</div>
        </div>
        <div className="billboard-content">
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
        </div>
      </div>  
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  const billboard = document.getElementById('billboard')
  if(billboard) {
    ReactDOM.render(<Billboard />, billboard)
  }
})