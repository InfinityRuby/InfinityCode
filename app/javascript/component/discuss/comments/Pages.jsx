import React from 'react'

export default function Pages({ commentPages, setCommentPages, maxPage }) {
  const previousPage = () => commentPages > 1 && setCommentPages(commentPages - 1)  
  const nextPage = () => commentPages < maxPage && setCommentPages(commentPages + 1)
  const changePage = event => setCommentPages(Number(event.target.textContent))

  return(
    <div className="single-article-page">
      <span onClick={ previousPage }><i className="fas fa-chevron-left"></i></span>
      { commentPages >= 4 ? <span onClick={ changePage }>1</span> : null }
      { commentPages >= 4 ? <h5>...</h5> : null }
      <span className="first-button-color" onClick={ changePage }>{ commentPages }</span>
      { commentPages + 1 < maxPage ? <span onClick={ changePage }>{ commentPages + 1 }</span> : null }
      { commentPages + 2 < maxPage ? <span onClick={ changePage }>{ commentPages + 2 }</span> : null }
      { commentPages + 3 < maxPage ? <span onClick={ changePage }>{ commentPages + 3 }</span> : null }
      { commentPages + 4 < maxPage ? <span onClick={ changePage }>{ commentPages + 4 }</span> : null }
      { commentPages + 4 < maxPage ? <h5>...</h5> : null }
      { commentPages < maxPage ? <span onClick={ changePage }>{ maxPage }</span> : null }
      <span onClick={ nextPage }><i className="fas fa-chevron-right"></i></span>
    </div>
  ) 
}