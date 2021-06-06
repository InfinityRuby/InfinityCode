import React, { useEffect, useState } from 'react'
import { CurrentList, Pages } from './'
import API from 'component/lib/API'

export default function Discuss() {
  const [list, setList] = useState([])
  const [initPage, setInitPage] = useState(1)
  const listAmount = initPage * 10
  const currentListAmount = list.slice(listAmount - 10, listAmount)
  
  useEffect(() => {
    API.get('posts')
      .then(res => {
        setList(res)
      })
  }, [])
  
  const searchList = event => {
    const searchValue = []
    const searchInput = document.getElementById('searchListInput')
    let currentSearch
    if(event.key == 'Enter'){
      API.get('posts')
        .then((post) => {
          list.splice(0, list.length)
          post.map(el => list.push(el))
          searchValue.push(event.target.value)
          searchInput.value = '' 
          currentSearch = list.filter(hash => hash.title.includes(searchValue.join()))
          setList(currentSearch)
          setInitPage(1)
        })
    }      
  }

  const resetDiscuss = () => {  
    setInitPage(1)
    API.get('posts')
      .then(res => setList(res))       
  }

  const unknownDisplay = () => {
    API.get('posts')
      .then(res => {
        const unknownUser = res.filter(item => item.unknown)
        setInitPage(1)
        setList(unknownUser)
      })
  }

  const switchDisplay = (event) => {
    document.querySelectorAll('.discuss:nth-child(1) > a').forEach(a => {
      a.style.color = "#9ca3af"
      event.target.style.color = "black"
    })
    event.target.textContent == "匿名的文章" && unknownDisplay()
    event.target.textContent == "全部的文章" && resetDiscuss()
  }

  return(
  <div>
    <div>
      <div className="discuss">
        <a onClick={ switchDisplay }>全部的文章</a>
        <a onClick={ switchDisplay }>匿名的文章</a>
        <a onClick={ switchDisplay }>待開發</a>
        <a onClick={ switchDisplay }>待開發</a>
      </div>
      <div className="discuss">
        <div>
          <a href="#">Hot</a>
          <a href="#">Newest to Oidest</a>
          <a href="#">Most Votes</a>
          <a href="#">文章數量 { list.length }</a>
          <a href="/posts/new">新增文章</a>
        </div>
        <div>
          <div className="discuss-search">
            <input type="text" placeholder="Search topics or comments" id="searchListInput" onKeyPress={ searchList } />
            <button onClick={ resetDiscuss }>Reset</button>
          </div>
        </div>
      </div>
      <CurrentList listAmount={ currentListAmount } />
      <Pages list={ list }
             listAmount={ listAmount }  
             initPage={ initPage } 
             setInitPage={ setInitPage } />
    </div>
  </div>
  )
}