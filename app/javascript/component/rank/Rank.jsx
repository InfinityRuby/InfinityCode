import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { API } from 'component/lib'
import RankInfo from './RankInfo'

function Ranking() {
  const [species, setSpecies] = useState(`coin`)
  const [rankInfo, setRankInfo] = useState([])

  useEffect(() => {
    const usersInfo = async () => {
      const rank = await API.get(`ranks/${species}`)
      setRankInfo(rank)
    }
    usersInfo()
  }, [species])

  const switchPage = (type, event) => {
    document.querySelectorAll('#ranking .pages > div').forEach(page => {
      page.classList.add('page-opacity')
      event.target.classList.remove('page-opacity')
    })
    setSpecies(type)
  }
  return(
    <div className="wrap">
      <div className="pages">
        <div onClick={ switchPage.bind(this, `coin`) }>金幣數</div>
        <div className="page-opacity" onClick={ switchPage.bind(this, `comment`) }>留言數</div>
        <div className="page-opacity" onClick={ switchPage.bind(this, `post`) }>發文數</div>
        <div className="page-opacity" onClick={ switchPage }>解題數</div>
      </div>
      <div className="body">
        <div className="title">
          <div>排名</div>
          <div>使用者</div>
          <div>得分</div>
        </div>
        <div className="content">
          <RankInfo rankInfo={ rankInfo } />
        </div>
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