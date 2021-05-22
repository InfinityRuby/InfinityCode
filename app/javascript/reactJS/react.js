import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'
import { faEraser } from '@fortawesome/free-solid-svg-icons'
  function SearchForum(props) {
    const {title, content, id} = props
    return(
      <div className="item">
        <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
        <div>      
            <h2><a href={"posts/"+id}>{title}</a></h2>
            <h3>{content}</h3>
        </div>
      </div>
    )
  }

  function Forum() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState([]) 
    const [change, setChange] = useState(true)

    const [initPage, setInitPage] = useState(1)
    const numberPage = initPage * 10
 
    const displayPage = list.slice(numberPage - 10, numberPage)
    const nowList = displayPage.map((list) => {
      return <SearchForum key={list.id} id={list.id} title={list.title} content={list.content} /> 
    })

    const searchNowPage = search.slice(numberPage - 10, numberPage)
    const searchList = searchNowPage.map((search) => {
      return <SearchForum key={search.id} id={search.id} title={search.title} content={search.content} />
    })
    
    useEffect(() => {
      fetch('jsons/data')
      .then(res => res.json())
      .then(post => setList(post))    
    }, [])

    function Pagenumber() {
      const nextPage = () => {
        if(numberPage < list.length){
          setInitPage(initPage + 1)
        }  
      }
      const previousPage = () => {
        if(initPage > 1){
          setInitPage(initPage - 1)
        }
      }
      const changePage = () => {
        if(initPage > 0){
          setInitPage(initPage - 2)
        }
      }
      const changePage2 = () => {
        if(initPage > 0) {
          setInitPage(initPage - 1)
        }
      }
      const changePage3 = () => {
        if(numberPage < list.length) {
          setInitPage(initPage + 1)
        }
      }
      const changePage4 = () => {
        if(numberPage < list.length){
          setInitPage(initPage + 2)
        }
      }

      const returnHome = () => {setInitPage(1)}
      const searchPage = (event) => {
        if(event.key == 'Enter'){
          if(Number(event.target.value) && Number(event.target.value) * 10 <= list.length + 10){
            setTimeout(() => {setInitPage(Number(event.target.value))}, 300)
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
        fetch('jsons/data')
        .then(res => res.json())
        .then((post) => {
           list.splice(0, list.length)
           post.map(el => list.push(el))
        }) 

        setTimeout(() => {setList([])}, 300) 
        setTimeout(() => {       
          const current_search = list.filter(hash => hash.title.includes(event.target.value))
          setChange(false) 
          setList(current_search)
          setChange(true)
          setInitPage(1)

          if(current_search != undefined){    
            setSearch(current_search)
          }
        }, 700)
      }      
    }

    function clickReset(event){
        setTimeout(() => {
          setChange(true)
          setInitPage(1)
          fetch('jsons/data')
          .then(res => res.json())
          .then(post => setList(post)) 
        }, 400)
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
              <a href="#">文章數量 {list.length}</a>
            </div>
            <div>
              <input type="text" id="forum_input" placeholder="Search topics or comments" onKeyPress={searchlist} />
              <button onClick={clickReset}>Reset</button>
            </div>
        </div>
        { change ? nowList : searchList }   
        <Pagenumber />
    </div>
    )
  }

  document.addEventListener('turbolinks:load', () => {
    if(document.getElementById('wrap')){
      ReactDOM.render(
        <Forum />,
          document.getElementById('wrap')
      )
    }
  })

  