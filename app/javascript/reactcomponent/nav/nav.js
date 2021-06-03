import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import API from '../lib/API'

function Nav() {
  const [user, setUser] = useState([])
  const [userCoins, setUserCoins] = useState([])
  const signOut = () => {
    API('/users/sign_out', 'DELETE', '')
    .then(() => location.href = "/")
  }

  useEffect(() => {
    API('/api/v1/users')
    .then(post => setUser(post))

    API('/api/v1/coins')
    .then(post => setUserCoins(post[post.length - 1]))
  }, [])

  return(
    <div className="home-nav">
      <div className="home-logo">
        <a href="/"><p className="home-logo-text">無 限 解 碼 戰</p></a>
        <img src="/quest/infinity-logo.png" alt="infinity" />
      </div>
      <div className="home-nav-item">
        <div className="home-nav-item-link">
          { user ?
          <ul>
            <li>
              <a href="/quests">解題區</a>
            </li>
            <li>
              <a href="/posts">討論區</a>
            </li>
            <li>
              <a href="#Rank-path">排行榜</a>
            </li>
            <li>
              <img src="/quest/star.png" alt="star" />
            </li>
            <li>
              <span>{ userCoins.coin_amount }</span>
            </li>
            <li className="user-account">
              <a href="#">
                <span className="user-email">
                  { user ? `${user.email}`.substring(0, `${user.email}`.lastIndexOf('@')) : null }
                </span>
                <i className="fas fa-chevron-down"></i>
              </a>
              <ul className="sub1">
                <li onClick={ () => { location.href = '/profile' } }>個人檔案</li>
                <li><a href="#Bookmarks-path"></a></li>
                <li onClick={ signOut } className="navbar-link">登出</li>
              </ul>
            </li>
          </ul>
          : null }
          <div className="user-btn">
            { user ? null :
            <div>
              <button onClick={ () => { location.href = '/users/sign_in' } } className="user-btn-login">
                登入
              </button>
              <button onClick={ () => { location.href = '/users/sign_up' } } className="user-btn-signup">
                註冊
              </button>
            </div> } 
          </div>
        </div>
      </div>
    </div> 
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('home-nav')) {
    ReactDOM.render(
      <Nav />,
      document.getElementById('home-nav')
    )
  }
})