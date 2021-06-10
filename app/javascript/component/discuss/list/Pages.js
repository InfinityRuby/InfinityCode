import React from 'react'

export default function Pages({ list, initPage, setInitPage }) {
  const nextPage = number => setInitPage(initPage + number)
  const previousPage = () => initPage > 1 && setInitPage(initPage - 1)
  const searchPage = event => {
    if(event.key == 'Enter'){
      if(Number(event.target.value) && Number(event.target.value) * 10 <= list.length + 10){
        setInitPage(Number(event.target.value))
      }
    }
  }

  const changePage = event => setInitPage(Number(event.target.textContent))

  return(
    <div className="pagination">
      <button onClick={ previousPage }>上一頁</button>
      <button onClick={ changePage }>{ initPage }</button>
      <button onClick={ changePage }>{ initPage + 1}</button>
      <button>{ initPage + 2 }</button>
      <button onClick={ changePage }>{ initPage + 3 }</button>
      <button onClick={ changePage }>{ initPage + 4 }</button>
      <button onClick={ () => nextPage(1) }>下一頁</button>
      <input type="text" onKeyDown={ searchPage } placeholder={ "目前在第"+initPage+"頁" } />
      <button onClick={ () => setInitPage(1) }>回首頁</button>
    </div>
  )
}