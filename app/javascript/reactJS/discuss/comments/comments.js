import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'
import marked from 'marked'
import UserComments from './users_comments'

export default function Comments() {
  const [commentsAPI, setCommentsAPI] = useState([])
  const [commentPages, setCommentPages] = useState(1)
  const commentTotal = commentsAPI.slice(commentPages * 6 - 6, commentPages * 6).map(comments => {
    return <UserComments key={ comments.id } id={ comments.id } content={ comments.comment } />
  })
  const commentButton = document.getElementById('comment-button')
  const commentTexarea = document.getElementById('comment-texarea')
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
    fetch(`/jsons/posts_comments/${id}`)
    .then(res => res.json())
    .then(posts => setCommentsAPI(posts))
  }, [])

  const postComment = () => {
    const postNewComment = {id: commentsAPI.length + 1 ,comment: commentTexarea.value}
    const newCommentsTotal = commentsAPI.concat(postNewComment)
    newCommentsTotal.pop()
    newCommentsTotal.unshift(postNewComment)
    setCommentsAPI(newCommentsTotal)
    setCommentPages(1)
    setTimeout(() => {commentTexarea.value = ''}, 0)
  }

  const previousPage = () => commentPages > 1 && setCommentPages(commentPages - 1)  
  const nextPage = () => commentPages * 6 < commentsAPI.length && setCommentPages(commentPages + 1)
  const changePage = event => commentPages * 6 < commentsAPI.length + 6 && setCommentPages(Number(event.target.textContent))
  const lastPage = event => setCommentPages(Number(event.target.textContent))
  const returnPage = () => setCommentPages(1)

  const sortComments = (status = false) => {
    commentsAPI.splice(0, commentsAPI.length)
    fetch(`/jsons/posts_comments/${id}`)
    .then(res => res.json())
    .then(posts => {
      const spaceArray = []
      const sortComments = spaceArray.concat(posts)
      const reverseComments = spaceArray.concat(posts.reverse())
      status == true ? setCommentsAPI(sortComments) : setCommentsAPI(reverseComments)
    }) 
  }

  return( 
    <div className="single-article-body">
      <div className="single-article-comments-count">
        <div>
            <i className="fa fa-comment-alt"></i>
            <span>{ `留言總數: ${commentsAPI.length}` }</span>
        </div>
        <div>
            <span>Best</span>
            <span>Most Votes</span>
            <span>Newest to Oldest</span>
            <span>Oldest to Newest</span>
        </div>
      </div>
      <div className="single-article-content-input">
          <div className="single-article-reverse-comments">
            <button onClick={ sortComments.bind(this, true) }>最新</button>
            <button onClick={ sortComments }>最舊</button>
          </div>
          <textarea name="singeArticle" id="comment-texarea" cols="10" rows="10" placeholder="此處留言...請注意用詞">
          </textarea>
          <div className="single-article-textarea-border">        
            <button id="comment-button" onClick={ postComment }>送出</button>
          </div>
      </div>
        { commentTotal }
      <div className="single-article-page">
        <span onClick={ previousPage }>◀</span>
        { commentPages >= 5 ?  <span onClick={ returnPage }>{1}</span> : null}
        { commentPages >= 5 ? <h5>...</h5> : null}
        { commentPages * 6 < commentsAPI.length + 6 ? <span className="first-button-color" onClick={ changePage }>{commentPages}</span> : null }
        { commentPages * 6 < commentsAPI.length - 6 ?  <span id="2" onClick={ changePage }>{ commentPages + 1}</span> : null }
        { commentPages * 6 < commentsAPI.length -12 ? <span id="3" onClick={ changePage }>{ commentPages + 2}</span> : null }
        { commentPages * 6 < commentsAPI.length - 18 ? <span id="4" onClick={ changePage }>{ commentPages + 3}</span> : null }
        { commentPages * 6 < commentsAPI.length - 24 ? <span id="5" onClick={ changePage }>{ commentPages + 4}</span> : null }
        { commentPages < Math.ceil(commentsAPI.length / 6) ? <h5>...</h5> : null}
        { commentPages < Math.ceil(commentsAPI.length / 6) ? <span onClick={ lastPage }>{Math.ceil(commentsAPI.length / 6)}</span> : null }
        <span onClick={ nextPage }>▶</span>
      </div>
    </div>
  )
}