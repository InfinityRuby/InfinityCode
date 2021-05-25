import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'
import marked from 'marked'

function UserComments(props) {
  const comments = props
  const commentRef = useRef()
  const [selectOption, setSelectOption] = useState('')
  function DeletePost() { 
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
      <button onClick={apiDestroy}>刪除這篇文章按鈕</button>
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
      <div>
        <div className="single-article-user-content markdown-body" dangerouslySetInnerHTML={{__html: marked(comments.content)}}></div>
      </div>
      <DeletePost />
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
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
    fetch(`/jsons/postscomments/${id}`)
    .then(res => res.json())
    .then(posts => setcommentsApi(posts))
  }, [])

  const postComment = () => {
    const postNewComment = {id: commentsApi.length + 1 ,comment: commentTexarea.value}
    const newCommentsTotal = commentsApi.concat(postNewComment)
    newCommentsTotal.pop()
    newCommentsTotal.unshift(postNewComment)
    setcommentsApi(newCommentsTotal)
    setcommentPages(1)
    setTimeout(() => {commentTexarea.value = ''}, 0)
  }

  const previousPage = () => commentPages > 1 && setcommentPages(commentPages - 1)  
  const nextPage = () => commentPages * 6 < commentsApi.length && setcommentPages(commentPages + 1)
  const changePage = event => commentPages * 6 < commentsApi.length + 6 && setcommentPages(Number(event.target.textContent))
  const lastPage = event => setcommentPages(Number(event.target.textContent))
  const returnPage = () => setcommentPages(1)

  const reverseComments = () => {
    commentsApi.splice(0, commentsApi.length)
    fetch(`/jsons/postscomments/${id}`)
    .then(res => res.json())
    .then(posts => {
      const spaceArray = []
      const reverseComments = spaceArray.concat(posts.reverse())
      setcommentsApi(reverseComments)
    }) 
  }

  const sortComments = () => {
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
    
    <div className="single-article-body">
      <div className="single-article-comments-count">
        <div>
            <i className="fa fa-comment-alt"></i>
            <span>{`留言總數: ${commentsApi.length}`}</span>
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
            <button onClick={ sortComments }>最新</button>
            <button onClick={ reverseComments }>最舊</button>
          </div>
          <textarea name="singeArticle" id="comment-texarea" cols="10" rows="10" placeholder="此處留言...請注意用詞">
          </textarea>
          <div className="single-article-textarea-border">        
            <button id="comment-button" onClick={postComment}>送出</button>
          </div>
      </div>
        { commentTotal }
      <div className="single-article-page">
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