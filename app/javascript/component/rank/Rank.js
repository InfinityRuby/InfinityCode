import React from 'react'
import ReactDOM from 'react-dom'

function Ranking() {
  const switchPage = event => {
    document.querySelectorAll('#ranking .pages > div').forEach(page => {
      page.style = 'opacity: 40%; background: #f3f4f6;'
      event.target.style = 'opacity: 80%; background: #fff;'
    })
  }
  return(
    <div className="wrap">
      <div className="pages">
        <div onClick={ switchPage }>解題數</div>
        <div onClick={ switchPage }>金幣數</div>
        <div onClick={ switchPage }>得讚數</div>
        <div onClick={ switchPage }>發文數</div>
      </div>
      <div className="body">
        <div className="title">
          <div>排名</div>
          <div>使用者</div>
          <div>得分</div>
        </div>
        <div className="content"></div>
      </div>  
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  const ranking = document.getElementById('ranking')
  if(ranking) {
    ReactDOM.render(<Ranking />, ranking)
  }
})