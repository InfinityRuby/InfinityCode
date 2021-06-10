import React, { useEffect, useState, useRef }  from 'react'
import { UserComments, Pages } from './'
import { API, urlID } from 'component/lib'
import marked from 'marked'

function CurrentComments({ comments, loginUser }) {
  return comments.map(comment => {
    const { id, author, content, created_at } = comment
    return <UserComments key={ id } 
                         id={ id }
                         author={ author } 
                         content={ content }
                         loginUser={ loginUser }
                         created={ created_at } />                       
  })
}

function getUserName(email) {
  return email.substring(0, email.lastIndexOf('@'))
}

export default function Comments() {
  const [commentsAPI, setCommentsAPI] = useState([])
  const [comments, setComments] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [author, setAuthor] = useState([])
  const [loginUser, setLoginUser] = useState([])
  const [commentPages, setCommentPages] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const sortCommentsRef = useRef()

  useEffect(() => {
    API.get(`posts/${urlID()}?page=${commentPages}`)
      .then(res => {
        const { comments, comments_total_pages, author } = res
        setCommentsAPI(res)
        setComments(comments)
        setMaxPage(comments_total_pages)
        setAuthor(author)
        API.get(`posts/${urlID()}?page=${comments_total_pages}`)
          .then(res => setQuantity(res.comments.length))
      })
  }, [commentPages, quantity])

  useEffect(() => {
    API.get(`users`)
      .then(res => setLoginUser(getUserName(res.email)))
  }, [])

  const postComment = () => {
    const commentTextarea = document.getElementById('comment-textarea')
    const apiData = { 
      content: commentTextarea.value, 
      picture: author.avatar,
      email: author.name
    }

    if(commentTextarea.value) {
      API.create(`posts/${urlID()}/comments`, apiData)
        .then(res => {
          const postNewComment = { 
            id: res.id,
            content: res.content, 
            created_at: res.created_at,
            author: {
              avatar: author.avatar,
              name: loginUser
            }
          }
          const newCommentsTotal = comments.concat(postNewComment)
          
          newCommentsTotal.pop()
          newCommentsTotal.length >= 10 ? newCommentsTotal.pop() : null
          newCommentsTotal.unshift(postNewComment)
          setComments(newCommentsTotal)
          setCommentPages(1)
          setQuantity(quantity + 1)    
          commentTextarea.value = ''
        })
    }
  }

  

  const sortComments = (status = false) => {
    comments.splice(0, comments.length)
    API.get(`posts/${urlID()}`)
      .then(res => {
        const storageCache = []
        const sortComments = storageCache.concat(res.comments)
        const reverseComments = storageCache.concat(res.comments.reverse())
        status == true ? setComments(sortComments) : setComments(reverseComments)
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
            <h2>{ commentsAPI.title }</h2>
          </div>
          <div className="single-article-title-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
        </div>
        <div className="single-article-content">
          <div className="single-article-content-wrap">
            <div className="single-article-content-author">
              <img src={ author.avatar == 'default.png' ? '/default.png' : author.avatar } alt="jpg" />
              { commentsAPI.unknown == true ? 
              <h3 style={{ color: 'blue' }}>匿名</h3> : 
              <h3 style={{ color: 'green' }}>{ author.name }</h3> 
              }
              <i className="fa fa-star"></i>
              <span>11212</span>
              <span>上次編輯日期: { `${commentsAPI.created_at}`.slice(0, 10) }</span>
            </div>
            <div className="single-article-content-body">
              <div className="markdown-body" 
                   dangerouslySetInnerHTML={ {__html: marked(`${commentsAPI.content}`)} }>
              </div>
            </div>
          </div>
        </div>
        <div className="single-article-comments-count">
        <div>
          <i className="fa fa-comment-alt"></i>
          <span>{ `留言總數: ${maxPage != 0 ? (maxPage - 1) * 10 + quantity : 0}` }</span>
          <select className="single-article-select" 
                  ref={ sortCommentsRef } 
                  onChange={ selectedOption }>
            <option value="sort">最新留言</option>
            <option value="reverse">最舊留言</option>
          </select>
        </div>

        { author.name == loginUser ?
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
        <CurrentComments comments={ comments } loginUser={ loginUser } />
        <Pages comments={ comments } 
               commentPages={ commentPages }  
               setCommentPages={ setCommentPages }
               maxPage={ maxPage } />
      </div>
    </div>
  )
}