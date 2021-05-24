import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'

function UserComments(props) {
  const comments = props
  const commentRef = useRef()
  
  function TestClick() { 
    const apiDestroy = () => {
      const token = document.querySelector('meta[name=csrf-token]').content
      const id = commentRef.current.dataset.id
      let url = window.location.href
      let localID = url.substring(url.lastIndexOf('/') + 1)
      const api = {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': token
        }
      }
      confirm('確認刪除嗎？')
      fetch(`/posts/${localID}/comments/${id}`, api)
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
      })
      setTimeout(() => location.href = "/posts", 200)
    }

    return(
      <button onClick={apiDestroy}>測試用按鈕</button>
    )
  }

  return(
    <div data-id={comments.id} ref={commentRef} className="single-article-user-comments">
      <div className="single-article-user-title">
          <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
          <h4>王小明</h4>
          <span>0</span>
          <span>a few seconds ago</span>
      </div>
      <div className="single-article-user-content">{comments.content}</div>
      <TestClick />
    </div>
  )
}

function Comments() {
  const [commentsApi, setcommentsApi] = useState([])
  const [commentPages, setcommentPages] = useState(1)
  const commentTotal = commentsApi.slice(commentPages * 6 - 6, commentPages * 6).map(comments => {
    return <UserComments key={comments.id} id={comments.id} content={comments.comment} />
  })

  const commentButton = document.getElementById('comment-button')
  const commentTexarea = document.getElementById('comment-texarea')

  useEffect(() => {
    let url = window.location.href
    let id = url.substring(url.lastIndexOf('/') + 1)
    fetch(`/jsons/postscomments/${id}`)
    .then(res => res.json())
    .then(posts => setcommentsApi(posts))
  }, [])

  commentButton.addEventListener('click', () => {
    const postNewComment = {id: commentsApi.length + 1 ,comment: commentTexarea.value}
    const newCommentsTotal = commentsApi.concat(postNewComment)

    newCommentsTotal.pop()
    newCommentsTotal.unshift(postNewComment)
    setcommentsApi(newCommentsTotal)
    setcommentPages(1)
    setTimeout(() => commentTexarea.value = '', 0)
  })

  const previousPage = () => commentPages > 1 && setcommentPages(commentPages - 1)  
  const nextPage = () => commentPages * 6 < commentsApi.length && setcommentPages(commentPages + 1)
  const changePage = event => commentPages * 6 < commentsApi.length + 6 && setcommentPages(Number(event.target.textContent))
  const lastPage = event => setcommentPages(Number(event.target.textContent))
  const returnPage = () => setcommentPages(1)

  const reversecomments = () => {
    let url = window.location.href
    let id = url.substring(url.lastIndexOf('/') + 1)
    commentsApi.splice(0, commentsApi.length)
    fetch(`/jsons/postscomments/${id}`)
    .then(res => res.json())
    .then(posts => {
      const spaceArray = []
      const reverseComments = spaceArray.concat(posts.reverse())
      setcommentsApi(reverseComments)
    }) 
  }

  const reverseCommentscomments = () => {
    let url = window.location.href
    let id = url.substring(url.lastIndexOf('/') + 1)
    commentsApi.splice(0, commentsApi.length)
    fetch(`/jsons/postscomments/${id}`)
    .then(res => res.json())
    .then(posts => {
      const spaceArray = []
      const reverseComments = spaceArray.concat(posts)
      setcommentsApi(reverseComments)
    }) 
  }

  return(
    <div>
      { commentTotal }
      <div className="single-article-page">
          <button onClick={ reverseCommentscomments }>最新</button>
          <button onClick={ reversecomments }>最舊</button>
          <span onClick={previousPage}>◀</span>
         { commentPages >= 5 ?  <span onClick={returnPage}>{1}</span> : null}
         { commentPages >= 5 ? <h5>...</h5> : null}
         { commentPages * 6 < commentsApi.length + 6 ? <span className="first-button-color" onClick={changePage}>{commentPages}</span> : null }
         { commentPages * 6 < commentsApi.length - 6 ?  <span id="2" onClick={changePage}>{commentPages + 1}</span> : null }
         { commentPages * 6 < commentsApi.length -12 ? <span id="3" onClick={changePage}>{commentPages + 2}</span> : null }
         { commentPages * 6 < commentsApi.length - 18 ? <span id="4" onClick={changePage}>{commentPages + 3}</span> : null }
         { commentPages * 6 < commentsApi.length - 24 ? <span id="5" onClick={changePage}>{commentPages + 4}</span> : null }
         { commentPages < Math.ceil(commentsApi.length / 6) ? <h5>...</h5> : null}
         { commentPages < Math.ceil(commentsApi.length / 6) ? <span onClick={lastPage}>{Math.ceil(commentsApi.length / 6)}</span> : null }
          <span onClick={nextPage}>▶</span>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('single-article-user-comments')){
    ReactDOM.render(
        <Comments />,
        document.getElementById('single-article-user-comments')
    )
  }
})