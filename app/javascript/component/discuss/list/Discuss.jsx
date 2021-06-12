import React, { useEffect, useState } from 'react'
import { CurrentList, Pages } from './'
import API from 'component/lib/API'

export default function Discuss() {
  const [lists, setLists] = useState([])
  const [maxPage, setMaxPage] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    API.get(`posts?page=${initPage}`)
      .then(res => {
        const { posts, total_pages } = res
        setLists(posts)
        setMaxPage(total_pages)
        API.get(`posts?page=${total_pages}`)
          .then(res => {
            setQuantity(res.posts.length)
            setLoading(true)
          })
      })
  }, [initPage])

  const searchList = event => {
    const searchValue = []
    const searchInput = document.getElementById('searchListInput')
    let currentSearch
    if(event.key == 'Enter'){
      API.get('posts')
        .then((res) => {
          lists.splice(0, lists.length)
          res.posts.map(el => lists.push(el))
          searchValue.push(event.target.value)
          searchInput.value = '' 
          currentSearch = lists.filter(hash => hash.title.includes(searchValue.join()))
          setLists(currentSearch)
          setInitPage(1)
        })
    }      
  }

  const resetDiscuss = () => {
    API.get(`posts`)
      .then(res => setLists(res.posts))
  }

  const unknownDisplay = () => {
    API.get('posts')
      .then(res => {
        const unknownUser = res.posts.filter(item => item.unknown)
        setInitPage(1)
        setLists(unknownUser)
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
    { loading ?
    <div>
      <div className="discuss">
        <a onClick={ switchDisplay }>全部的文章</a>
        <a onClick={ switchDisplay }>匿名的文章</a>
      </div>
      <div className="discuss">
        <div>
          <a href="/posts/new">新增文章</a>
          <span>文章數量 { maxPage != 0 ? (maxPage - 1) * 10 + quantity : 0 }</span>
        </div>
        <div>
          <div className="discuss-search">
            <input type="text" placeholder="搜尋文章" id="searchListInput" onKeyPress={ searchList } />    
          </div>
        </div>
      </div>
      <CurrentList lists={ lists } />
      <Pages lists={ lists }
             initPage={ initPage } 
             setInitPage={ setInitPage }
             maxPage={ maxPage } />
    </div>
    : null }
  </div>
  )
}