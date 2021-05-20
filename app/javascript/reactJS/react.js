import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'

  function SearchForum(props) {
    const {title, content} = props
    return(
      <div className="item">
        <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
        <div>      
            <h2><a href="#">{title}</a></h2>
            <h3>{content}</h3>
        </div>
      </div>
    )
  }

  function Forum() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState([]) 
    const [change, setChange] = useState(true)

    const [initPage, setNowPage] = useState(1)
    const numberPage = initPage * 10
 
    const displayPage = list.slice(numberPage - 10, numberPage)
    const nowList = displayPage.map((list) => {
      return <SearchForum key={list.id} title={list.title} content={list.content} /> 
    })

    const searchNowPage = search.slice(numberPage - 10, numberPage)
    const searchList = searchNowPage.map((search) => {
      return <SearchForum key={search.id} title={search.title} content={search.content} />
    })  

    useEffect(() => {
      fetch('jsons/data')
      .then(res => res.json())
      .then(post => setList(post))    
    }, [])

    function Pagenumber() {
      const nextPage = () => {
        if(numberPage < list.length){
          setNowPage(initPage + 1)
        }  
      }
      const previousPage = () => {
        if(initPage > 1){
          setNowPage(initPage - 1)
        }
      }
      const changePage = () => {
        if(initPage > 0){
          setNowPage(initPage - 2)
        }
      }
      const changePage2 = () => {
        if(initPage > 0) {
          setNowPage(initPage - 1)
        }
      }
      const changePage3 = () => {
        if(numberPage < list.length) {
          setNowPage(initPage + 1)
        }
      }
      const changePage4 = () => {
        if(numberPage < list.length){
          setNowPage(initPage + 2)
        }
      }

      const returnHome = () => {setNowPage(1)}
      const searchPage = (event) => {
        if(event.key == 'Enter'){
          if(Number(event.target.value) && Number(event.target.value) * 10 <= list.length + 10){
            setNowPage(Number(event.target.value))
          }
        }
      }
      
      return(
        <div className="pagination">
          <button onClick={previousPage}>上一頁</button>

          {initPage > 2 ? <button onClick={changePage}>{initPage - 2}</button> : null}
          {initPage > 1 ? <button onClick={changePage2}>{initPage - 1} </button> : null}
          <button>{initPage}</button>
          {initPage * 10 < list.length ? <button onClick={changePage3}>{initPage + 1}</button> : null}
          {initPage * 10 + 10 < list.length ? <button onClick={changePage4}>{initPage + 2}</button> : null}
          
          <button onClick={nextPage}>下一頁</button>
          <input type="text" onKeyDown={searchPage} placeholder={"目前在第"+initPage+"頁"} />
          <button onClick={returnHome}>回首頁</button>
        </div>
      )
    }

    function searchlist(event) {
      if(event.key == 'Enter'){
        setChange(false)
        const current_search = list.filter(hash => hash.title.includes(event.target.value))
        setList(current_search)
        
      
        if(current_search != undefined){    
          setSearch(current_search)
        }
      }
      if(event.target.value == ''){
        setChange(true)
        setNowPage(1)
        fetch('jsons/data')
        .then(res => res.json())
        .then(post => setList(post)) 
      }  
    }
   
    return(
    <div>
        <div className="item">
          <a href="#">All Interview Quesions</a>
          <a href="#">System Design</a>
          <a href="#">Operating System</a>
          <a href="#">Object-Oriented Design</a>
        </div>
        <div className="item">
            <div>
              <a href="#">Hot</a>
              <a href="#">Newest to Oidest</a>
              <a href="#">Most Votes</a>
            </div>
            <div>
              <input type="text" id="forum_input" placeholder="Search topics or comments" onKeyDown={searchlist} />
              <button>New +</button>
            </div>
        </div>
        { change ? nowList : searchList }   
        <Pagenumber />
    </div>
    )
  }

document.addEventListener('turbolinks:load', () => {
  ReactDOM.render(
    <Forum />,
      document.getElementById('wrap')
  )
})