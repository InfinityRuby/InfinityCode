import React from 'react'

export default function Pages({ list, listAmount, initPage, setInitPage }) {
  const nextPage = number => listAmount < list.length && setInitPage(initPage + number)
  const previousPage = () => initPage > 1 && setInitPage(initPage - 1)
  const jumpPage = number => initPage > 0 && setInitPage(initPage - number)
  const searchPage = event => {
    if(event.key == 'Enter'){
      if(Number(event.target.value) && Number(event.target.value) * 10 <= list.length + 10){
        setInitPage(Number(event.target.value))
      }
    }
  }

  return(
    <div className="pagination">
      <button onClick={ previousPage }>上一頁</button>
      { initPage > 2 ? <button onClick={ () => jumpPage(2) }>{ initPage - 2 }</button> : null }
      { initPage > 1 ? <button onClick={ () => jumpPage(1) }>{ initPage - 1 } </button> : null }
      <button>{ initPage }</button>
      { initPage * 10 < list.length ? <button onClick={ () => nextPage(1) }>{ initPage + 1 }</button> : null }
      { initPage * 10 + 10 < list.length ? <button onClick={ () => nextPage(2) }>{ initPage + 2 }</button> : null }
      <button onClick={ () => nextPage(1) }>下一頁</button>
      <input type="text" onKeyDown={ searchPage } placeholder={ "目前在第"+initPage+"頁" } />
      <button onClick={ () => setInitPage(1) }>回首頁</button>
    </div>
  )
}