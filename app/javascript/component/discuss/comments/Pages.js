import React from 'react'

export default function Pages({ commentsAPI, commentPages, setCommentPages }) {
  const previousPage = () => commentPages > 1 && setCommentPages(commentPages - 1)  
  const nextPage = () => commentPages * 6 < commentsAPI.length && setCommentPages(commentPages + 1)
  const changePage = event => commentPages * 6 < commentsAPI.length + 6 && setCommentPages(Number(event.target.textContent))
  const lastPage = event => setCommentPages(Number(event.target.textContent))
  const returnPage = () => setCommentPages(1)

  return(
    <div className="single-article-page">
      <span onClick={ previousPage }><i className="fas fa-chevron-left"></i></span>
      { commentPages >= 5 ? <span onClick={ returnPage }>{ 1 }</span> : null }
      { commentPages >= 5 ? <h5>...</h5> : null }
      { commentPages * 6 < commentsAPI.length + 6 ? <span className="first-button-color" onClick={ changePage }>{ commentPages }</span> : null }
      { commentPages * 6 < commentsAPI.length - 6 ?  <span id="2" onClick={ changePage }>{ commentPages + 1 }</span> : null }
      { commentPages * 6 < commentsAPI.length -12 ? <span id="3" onClick={ changePage }>{ commentPages + 2 }</span> : null }
      { commentPages * 6 < commentsAPI.length - 18 ? <span id="4" onClick={ changePage }>{ commentPages + 3 }</span> : null }
      { commentPages * 6 < commentsAPI.length - 24 ? <span id="5" onClick={ changePage }>{ commentPages + 4 }</span> : null }
      { commentPages < Math.ceil(commentsAPI.length / 6) ? <h5>...</h5> : null }
      { commentPages < Math.ceil(commentsAPI.length / 6) ? <span onClick={ lastPage }>{ Math.ceil(commentsAPI.length / 6) }</span> : null }
      <span onClick={ nextPage }><i className="fas fa-chevron-right"></i></span>
    </div>
  )
}