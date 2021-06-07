import React from 'react'

export default function Pages({ comments, commentPages, setCommentPages }) {
  const previousPage = () => commentPages > 1 && setCommentPages(commentPages - 1)  
  const nextPage = () => setCommentPages(commentPages + 1)
  const changePage = event => setCommentPages(Number(event.target.textContent))

  return(
    <div className="single-article-page">
      <span onClick={ previousPage }><i className="fas fa-chevron-left"></i></span>
      <span className="first-button-color" onClick={ changePage }>{ commentPages }</span>
      <span onClick={ changePage }>{ commentPages + 1 }</span>
      <span onClick={ changePage }>{ commentPages + 2 }</span>
      <span onClick={ changePage }>{ commentPages + 3 }</span>
      <span onClick={ changePage }>{ commentPages + 4 }</span>
      <span onClick={ nextPage }><i className="fas fa-chevron-right"></i></span>
    </div>
  )
}