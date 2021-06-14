import React, { useEffect, useState } from 'react'
import { CurrentList, Pages } from './'
import API from 'component/lib/API'

export default function Discuss() {
  const [lists, setLists] = useState([])
  const [maxPage, setMaxPage] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [search, setSearch] = useState(`&search=`)
  const [anonymous, setAnonymous] = useState(`&anonymous=`)
  const [quantity, setQuantity] = useState(0)
  const [url, setURL] = useState(`posts`)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    API.get(`${url}?page=${initPage}${search}${anonymous}`)
      .then(res => {
        const { posts, total_pages } = res
        setLists(posts)
        setMaxPage(total_pages)
        API.get(`${url}?page=${total_pages}${search}${anonymous}`)
          .then(res => {
            setQuantity(res.posts.length)
            setLoading(true)
          })
      })
  }, [initPage, search, url, anonymous])

  const searchList = event => {
    const searchInput = document.getElementById('searchListInput')
    if(event.key == 'Enter'){
      setSearch(`&search=${searchInput.value}`)
      setInitPage(1)
      searchInput.value = ''
    }      
  }

  const pageSwitch = page => {
    setAnonymous(`&anonymous`)
    setURL(page)
  }

  const unknownDisplay = () => {
    setURL(`posts`)
    setAnonymous(`&anonymous=true`)
  }

  const switchDisplay = event => {
    document.querySelectorAll('.discuss:nth-child(1) > a').forEach(a => {
      a.classList.add('page-opacity')
      event.target.classList.remove('page-opacity')
    })
    event.target.textContent == "匿名的文章" && unknownDisplay()
    event.target.textContent == "全部的文章" && pageSwitch(`posts`)
    event.target.textContent == "已解題答案" && pageSwitch(`problems`)
  }

  return(
  <div>
    { loading ?
    <div>
      <div className="discuss">
        <a onClick={ switchDisplay }>全部的文章</a>
        <a className="page-opacity" onClick={ switchDisplay }>匿名的文章</a>
        <a className="page-opacity" onClick={ switchDisplay }>已解題答案</a>
      </div>
      <div className="discuss">
        <div>
          <a href="/posts/new"><i className="fas fa-plus-square"></i>新增文章</a>
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