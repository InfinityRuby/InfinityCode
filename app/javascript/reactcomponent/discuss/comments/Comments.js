import React, { useEffect, useState }  from 'react'
import UserComments from './UsersComments'
import API from '../lib/API'
import allID from '../lib/ID'
import marked from 'marked'

function CurrentComments({ commentsAmount, userName }) {
  return commentsAmount.map(comments => {
    return <UserComments key={ comments.id } 
                         id={ comments.id } 
                         content={ comments.content }
                         create={ comments.created_at }
                         userName={ userName } />
  })
}

export default function Comments() {
  const [commentsAPI, setCommentsAPI] = useState([])
  const [currentPost, setCurrentPost] = useState([])
  const [userValue, setUserValue] = useState([])
  const [postValue, setPostValue] = useState([])
  const [commentPages, setCommentPages] = useState(1)
  const commentsAmount = commentsAPI.slice(commentPages * 6 - 6, commentPages * 6)
  const commentTextarea = document.getElementById('comment-textarea')

  useEffect(() => {
    fetch(`/jsons/posts_comments/${allID('post')}`)
    .then(res => res.json())
    .then(post => setCommentsAPI(post))
    fetch(`/jsons/data`)
    .then(res => res.json())
    .then(post => {
      const currentPostID = post.filter(item => item.id == allID('post'))[0]
      setPostValue(currentPostID)
    })
    fetch(`/api/v1/posts/${allID('post')}/user`)
    .then(res => res.json())
    .then(post => { 
      const currentUser = `${post.email}`
      const currentUserName = currentUser.substring(0, currentUser.indexOf('@'))
      setUserValue(currentUserName)
     })
    fetch(`/api/v1/posts/${allID('post')}`)
    .then(res => res.json())
    .then(post => setCurrentPost(post))
  }, [])

  const postComment = event => {
    if(commentsAPI.length && commentTextarea.value) {
      const postNewComment = { id: commentsAPI[0].id + 1, content: commentTextarea.value, created_at: commentsAPI[0].created_at }
      const newCommentsTotal = commentsAPI.concat(postNewComment)
      newCommentsTotal.pop()
      newCommentsTotal.unshift(postNewComment)
      setCommentsAPI(newCommentsTotal)
      setCommentPages(1)
      setTimeout(() => { commentTextarea.value = '' }, 0)     
      API('POST', { content: commentTextarea.value }, 'newComment')
    }else if(commentsAPI.length == 0){
      API('POST', { content: commentTextarea.value }, 'newComment')
      location.href = `/posts/${allID('post')}`
    }
  }

  const previousPage = () => commentPages > 1 && setCommentPages(commentPages - 1)  
  const nextPage = () => commentPages * 6 < commentsAPI.length && setCommentPages(commentPages + 1)
  const changePage = event => commentPages * 6 < commentsAPI.length + 6 && setCommentPages(Number(event.target.textContent))
  const lastPage = event => setCommentPages(Number(event.target.textContent))
  const returnPage = () => setCommentPages(1)

  const sortComments = (status = false) => {
    commentsAPI.splice(0, commentsAPI.length)
    fetch(`/jsons/posts_comments/${allID('post')}`)
    .then(res => res.json())
    .then(posts => {
      const storageCache = []
      const sortComments = storageCache.concat(posts)
      const reverseComments = storageCache.concat(posts.reverse())
      status == true ? setCommentsAPI(sortComments) : setCommentsAPI(reverseComments)
    }) 
  }

  const destroyPost = () => {
    if(confirm('確認要刪除這篇文章嗎？')) {
      API('DELETE', '', 'destroyPost')
      location.href = '/posts'
    }
  }

  return( 
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
            <h3>{ currentPost.unknown == true ? '匿名' : userValue }</h3>
            <i className="fa fa-star"></i>
            <span>11212</span>
            <span>上次編輯日期: { `${postValue.created_at}`.slice(0, 10) }</span>
          </div>
          <div className="single-article-content-body">
            <div className="markdown-body" dangerouslySetInnerHTML={ {__html: marked(postValue.content + '')} }>
            </div>
            <div className="single-article-content-span">
              <span>online assessment</span>
              <span>microsoft</span>
              <span>Create Time: 1</span>     
            </div>
          </div>
        </div>
      </div>
      <div className="single-article-comments-count">
      <div>
        <i className="fa fa-comment-alt"></i>
        <span>{ `留言總數: ${commentsAPI.length}` }</span>
      </div>
      <div>
        <span><a href={ `/posts/${allID('post')}/edit` }>文章編輯</a></span>
        <span onClick={ destroyPost }>文章刪除</span> 
      </div>
    </div> 
      <div className="single-article-content-input">
        <div className="single-article-reverse-comments">
          <button onClick={ sortComments.bind(this, true) }>最新留言</button>
          <button onClick={ sortComments }>最舊留言</button>
        </div>
        <textarea name="singeArticle" id="comment-textarea" cols="10" rows="10" placeholder="此處留言...請注意用詞">
        </textarea>
        <div className="single-article-textarea-border">        
          <button id="comment-button" onClick={ postComment }>送出</button>
        </div>
    </div>
      <CurrentComments commentsAmount={ commentsAmount } userName={ userValue } />
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
  )
}