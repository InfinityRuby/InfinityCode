import React, { useEffect, useState, useRef }  from 'react'
import { UserComments, Pages } from './'
import { API, urlID } from 'component/lib'
import marked from 'marked'

<<<<<<< HEAD
function CurrentComments({ commentsAmount, loginUser }) {
  return commentsAmount.map(comments => {
    const { id, email, content, created_at } = comments
    return <UserComments key={ id } 
                         id={ id }
                         email={ accountOutput(email) } 
=======
function CurrentComments({ comments, loginUser }) {
  return comments.map(comment => {
    const { id, email, content, created_at } = comment
    return <UserComments key={ id } 
                         id={ id }
                         email={ getUserName(email) } 
>>>>>>> development
                         content={ content }
                         createTime={ created_at }
                         loginUser={ loginUser } />                       
  })
}

<<<<<<< HEAD
function accountOutput(email) {
=======
function getUserName(email) {
>>>>>>> development
  return email.substring(0, email.lastIndexOf('@'))
}

export default function Comments() {
  const [commentsAPI, setCommentsAPI] = useState([])
  const [currentPost, setCurrentPost] = useState([])
<<<<<<< HEAD
  const [userValue, setUserValue] = useState([])
  const [postUserValue, setPostUserValue] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [commentPages, setCommentPages] = useState(1)
  const sortCommentsRef = useRef()
  const commentsAmount = commentsAPI.slice(commentPages * 6 - 6, commentPages * 6)
=======
  const [user, setUser] = useState([])
  const [postAuthor, setPostAuthor] = useState([])
  const [loginUser, setLoginUser] = useState([])
  const [commentPages, setCommentPages] = useState(1)
  const sortCommentsRef = useRef()
  const comments = commentsAPI.slice(commentPages * 6 - 6, commentPages * 6)
>>>>>>> development

  useEffect(() => {
    API.get(`posts/${urlID()}/comments`)
      .then(res => { 
<<<<<<< HEAD
        setUserValue(res.user)
=======
        setUser(res.user)
>>>>>>> development
        setCommentsAPI(res.comments)
    }) 
    API.get(`posts/${urlID()}/user`) 
      .then(res => { 
<<<<<<< HEAD
        setPostUserValue(accountOutput(res.email))
=======
        setPostAuthor(getUserName(res.email))
>>>>>>> development
     })
    API.get(`posts/${urlID()}`) 
      .then(res => { 
        setCurrentPost(res)    
    })
    API.get(`users`)
<<<<<<< HEAD
      .then(res => setCurrentUser(accountOutput(res.email)))
=======
      .then(res => setLoginUser(getUserName(res.email)))
>>>>>>> development
  }, [])

  const postComment = () => {
    const commentTextarea = document.getElementById('comment-textarea')
<<<<<<< HEAD
    const apiData = { content: commentTextarea.value, email: userValue.email }
    let postNewComment
    let newCommentsTotal
=======
    const apiData = { content: commentTextarea.value, email: user.email }
>>>>>>> development

    if(commentTextarea.value) {
      API.create(`posts/${urlID()}/comments`, apiData)
        .then(res => {
<<<<<<< HEAD
          postNewComment = { 
=======
          const postNewComment = { 
>>>>>>> development
            id: res.id,
            content: res.content, 
            created_at: res.created_at, 
            email: res.email 
          }
<<<<<<< HEAD
          
          newCommentsTotal = commentsAPI.concat(postNewComment)
=======
          const newCommentsTotal = commentsAPI.concat(postNewComment)
          
>>>>>>> development
          newCommentsTotal.pop()
          newCommentsTotal.unshift(postNewComment)
          setCommentsAPI(newCommentsTotal)
          setCommentPages(1)    
          commentTextarea.value = ''
      })
    }
  }

  

  const sortComments = (status = false) => {
    commentsAPI.splice(0, commentsAPI.length)
    API.get(`posts/${urlID()}/comments`)
      .then(res => {
        const storageCache = []
        const sortComments = storageCache.concat(res.comments)
        const reverseComments = storageCache.concat(res.comments.reverse())
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
      API.delete(`/api/v1/posts/${urlID('edit')}`)
      location.href = '/posts'
    }
  }

  return( 
    <div>
      <div>
        <div className="single-article-title">
          <div className="single-article-title-goback">
            <a href="/posts">《 Back</a>
          </div>
          <div className="single-article-title-word">
            <i className="fas fa-paperclip"></i>
            <h2>{ currentPost.title }</h2>
          </div>
          <div className="single-article-title-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        </div>
        <div className="single-article-content">
          <div className="single-article-content-wrap">
            <div className="single-article-content-author">
              <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
<<<<<<< HEAD
              { currentPost.unknown == true ? <h3 style={{ color: 'blue' }}>匿名</h3> : <h3 style={{ color: 'green' }}>{ postUserValue }</h3> }
=======
              { currentPost.unknown == true ? <h3 style={{ color: 'blue' }}>匿名</h3> : <h3 style={{ color: 'green' }}>{ postAuthor }</h3> }
>>>>>>> development
              <i className="fa fa-star"></i>
              <span>11212</span>
              <span>上次編輯日期: { `${currentPost.created_at}`.slice(0, 10) }</span>
            </div>
            <div className="single-article-content-body">
              <div className="markdown-body" dangerouslySetInnerHTML={ {__html: marked(`${currentPost.content}`)} }>
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

<<<<<<< HEAD
        { postUserValue == currentUser ?
=======
        { postAuthor == loginUser ?
>>>>>>> development
        <div>
          <span><a href={ `/posts/${urlID()}/edit` }>文章編輯</a></span> 
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
<<<<<<< HEAD
        <CurrentComments commentsAmount={ commentsAmount } loginUser={ currentUser } />
=======
        <CurrentComments comments={ comments } loginUser={ loginUser } />
>>>>>>> development
        <Pages commentsAPI={ commentsAPI } 
               commentPages={ commentPages }  
               setCommentPages={ setCommentPages } />
      </div>
    </div>
  )
}