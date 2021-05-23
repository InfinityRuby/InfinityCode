import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'

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
    const [initPage, setInitPage] = useState(1)
    const numberPage = initPage * 10
    const displayPage = list.slice(numberPage - 10, numberPage)
    const nowList = displayPage.map((list) => {
      return <SearchForum key={list.id} id={list.id} title={list.title} content={list.content} /> 
    })

    useEffect(() => {
      fetch('/jsons/data')
      .then(res => res.json())
      .then(post => setList(post))    
    }, [])

    function Pagenumber() {
      const nextPage = number => numberPage < list.length && setInitPage(initPage + number)
      const previousPage = () => initPage > 1 && setInitPage(initPage - 1)
      const jumpPage = number => initPage > 0 && setInitPage(initPage - number)
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
          {initPage > 2 ? <button onClick={jumpPage.bind(this, 2)}>{initPage - 2}</button> : null}
          {initPage > 1 ? <button onClick={jumpPage.bind(this, 1)}>{initPage - 1} </button> : null}
          <button>{initPage}</button>
          {initPage * 10 < list.length ? <button onClick={nextPage.bind(this, 1)}>{initPage + 1}</button> : null}
          {initPage * 10 + 10 < list.length ? <button onClick={nextPage.bind(this, 2)}>{initPage + 2}</button> : null}
          <button onClick={nextPage.bind(this, 1)}>下一頁</button>
          <input type="text" onKeyDown={searchPage} placeholder={"目前在第"+initPage+"頁"} />
          <button onClick={() => setInitPage(1)}>回首頁</button>
        </div>
      )
    }
    
    function searchlist(event) {
      if(event.key == 'Enter'){
        fetch('/jsons/data')
        .then(res => res.json())
        .then((post) => {
           list.splice(0, list.length)
           post.map(el => list.push(el))
        }) 

        setTimeout(() => {setList([])}, 300) 
        setTimeout(() => {       
          const current_search = list.filter(hash => hash.title.includes(event.target.value)) 
          setList(current_search)
          setInitPage(1)
        }, 700)
      }      
    }

    function clickReset(event){
        setTimeout(() => {
          fetch('/jsons/data')
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
         { nowList }
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
