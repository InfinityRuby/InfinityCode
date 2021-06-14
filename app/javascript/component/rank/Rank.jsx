import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { API } from 'component/lib'
import RankInfo from './RankInfo'

function Ranking() {
  const [species, setSpecies] = useState(`coins`)
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
        <div onClick={ switchPage.bind(this, `coins`) }>金幣數</div>
        <div className="page-opacity" onClick={ switchPage.bind(this, `solved`) }>解題數</div>
        <div className="page-opacity" onClick={ switchPage.bind(this, `posts`) }>發文數</div>
        <div className="page-opacity" onClick={ switchPage.bind(this, `likes`) }>得讚數</div>
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