import React, { useEffect, useState, useRef }  from 'react'
import UserComments from './UsersComments'
import API from '../lib/API'
import allID from '../lib/ID'
import marked from 'marked'
import Loading from '../lib/Loading'

function CurrentComments({ commentsAmount, loginUser }) {
  return commentsAmount.map(comments => {
    return <UserComments key={ comments.id } 
                         id={ comments.id }
                         email={ `${comments.email}`
                         .substring(0, `${comments.email}`.lastIndexOf('@')) } 
                         content={ comments.content }
                         createTime={ comments.created_at }
                         loginUser={ loginUser } />                       
  })
}

export default function Comments() {
  const [commentsAPI, setCommentsAPI] = useState([])
  const [currentPost, setCurrentPost] = useState([])
  const [userValue, setUserValue] = useState([])
  const [postUserValue, setPostUserValue] = useState([])
  const [postValue, setPostValue] = useState([])
  const sortCommentsRef = useRef()
  const [loading, setLoading] = useState(undefined)
  const [commentPages, setCommentPages] = useState(1)
  const commentsAmount = commentsAPI.slice(commentPages * 6 - 6, commentPages * 6)
  const loginUser = document.querySelector('.user-account span')

  useEffect(() => {
    API(`/api/v1/posts/${allID('post')}/comments`)
    .then(post => { 
      setUserValue(post.user)
      setCommentsAPI(post.comments)
    }) 
    API(`/jsons/data`)  
    .then(post => {
      const currentPostID = post.filter(item => item.id == allID('post'))[0]
      setPostValue(currentPostID)
    })
    API(`/api/v1/posts/${allID('post')}/user`) 
    .then(post => { 
      const currentUser = `${post.email}`
      const currentUserName = currentUser.substring(0, currentUser.indexOf('@'))
      setPostUserValue(currentUserName)
     })
    API(`/api/v1/posts/${allID('post')}`) 
    .then(post => {
      setTimeout(() => {
        setLoading(true)   
        setCurrentPost(post)   
      }, 700);    
    })
  }, [])

  const postComment = () => {
    const commentTextarea = document.getElementById('comment-textarea')

    if(commentTextarea.value) {
      API(`/api/v1/posts/${allID('post')}/comments`, 
      'POST', { content: commentTextarea.value, email: userValue.email })
      .then(post => {
        const postNewComment = { id: post.id, content: post.content, created_at: post.created_at, email: post.email }
        const newCommentsTotal = commentsAPI.concat(postNewComment)
        newCommentsTotal.pop()
        newCommentsTotal.unshift(postNewComment)
        setCommentsAPI(newCommentsTotal)
        setCommentPages(1)    
        commentTextarea.value = ''
      })
    }
  }

  const previousPage = () => commentPages > 1 && setCommentPages(commentPages - 1)  
  const nextPage = () => commentPages * 6 < commentsAPI.length && setCommentPages(commentPages + 1)
  const changePage = event => commentPages * 6 < commentsAPI.length + 6 && setCommentPages(Number(event.target.textContent))
  const lastPage = event => setCommentPages(Number(event.target.textContent))
  const returnPage = () => setCommentPages(1)

  const sortComments = (status = false) => {
    commentsAPI.splice(0, commentsAPI.length)
    API(`/jsons/posts_comments/${allID('post')}`)
    
    .then(posts => {
      const storageCache = []
      const sortComments = storageCache.concat(posts)
      const reverseComments = storageCache.concat(posts.reverse())
      status == true ? setCommentsAPI(sortComments) : setCommentsAPI(reverseComments)
    }) 
  }

  const selectedOption = (event) => {
    const selected = event.target.selectedIndex
    if(sortCommentsRef.current.options[selected].value == 'sort') {
      sortComments(true)
    }else {
      sortComments()
    }
  }

  const destroyPost = () => {
    if(confirm('確認要刪除這篇文章嗎？')) {
      API(`/api/v1/posts/${allID('edit')}`, 'DELETE', '', )
      location.href = '/posts'
    }
  }

  return( 
    <div>
      { loading ?
      <div>
        <div className="single-article-title">
          <div className="single-article-title-goback">
            <a href="/posts">《 Back</a>
          </div>
          <div className="single-article-title-word">
            <i className="fas fa-paperclip"></i>
            <h2>{ postValue.title }</h2>
          </div>
          <div className="single-article-title-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        </div>
        <div className="single-article-content">
          <div className="single-article-content-wrap">
            <div className="single-article-content-author">
              <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
              { currentPost.unknown == true ? <h3 style={{ color: 'blue' }}>匿名</h3> : <h3 style={{ color: 'green' }}>{ postUserValue }</h3> }
              <i className="fa fa-star"></i>
              <span>11212</span>
              <span>上次編輯日期: { `${postValue.created_at}`.slice(0, 10) }</span>
            </div>
            <div className="single-article-content-body">
              <div className="markdown-body" dangerouslySetInnerHTML={ {__html: marked(`${postValue.content}`)} }>
              </div>
            </div>
          </div>
        </div>
        <div className="single-article-comments-count">
        <div>
          <i className="fa fa-comment-alt"></i>
          <span>{ `留言總數: ${commentsAPI.length}` }</span>
          <select className="single-article-select" ref={ sortCommentsRef } onChange={ selectedOption }>
            <option value="sort">最新留言</option>
            <option value="reverse">最舊留言</option>
          </select>
        </div>

        { postUserValue == loginUser.textContent ?
        <div>
          <span><a href={ `/posts/${allID('post')}/edit` }>文章編輯</a></span> 
          <span onClick={ destroyPost }>文章刪除</span> 
        </div>
        : null }
            </div>
        <div className="single-article-content-input">
          <textarea name="singeArticle" id="comment-textarea" cols="10" rows="10" placeholder="此處留言...請注意用詞">
          </textarea>
          <div className="single-article-textarea-border">
            <button id="comment-button" onClick={ postComment }>送出</button>
          </div>
            </div>
        <CurrentComments commentsAmount={ commentsAmount } loginUser={ loginUser.textContent } />
            <div className="single-article-page">
        <span onClick={ previousPage }><i className="fas fa-chevron-left"></i></span>
        { commentPages >= 5 ?  <span onClick={ returnPage }>{ 1 }</span> : null }
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
      </div>
      : <Loading /> }
  </div>
  )
}