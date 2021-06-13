import React, { useEffect, useState } from 'react'
import { CurrentList, Pages } from './'
import API from 'component/lib/API'

export default function Discuss() {
  const [lists, setLists] = useState([])
  const [maxPage, setMaxPage] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [search, setSearch] = useState(`&search=`)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    API.get(`posts?page=${initPage}${search}`)
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
  }, [initPage, search])

  const searchList = event => {
    const searchInput = document.getElementById('searchListInput')
    if(event.key == 'Enter'){
      setSearch(`&search=${searchInput.value}`)
      setInitPage(1)
      searchInput.value = ''
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