import React from 'react'

export default function RankInfo({ rankInfo }) {
  return rankInfo.map((info, index) => {
    const { id, profile, score } = info
    const { name, avatar } = profile

    return <UserInfo key={ id }
                    index={ index }
                    name={ name }
                    avatar={ avatar }
                    score={ score }/>
  })
}
  
function UserInfo({ index, name, avatar, score }) {
  return(
    <div className="user-info">
      <div>{ index + 1 }</div>
      <div>
        <img src={ avatar } alt="/default" />
        <span>{ name }</span>
      </div>
      <div>{ score }</div>
    </div>
  )
}