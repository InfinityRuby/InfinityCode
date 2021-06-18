import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { API, urlID } from 'component/lib'
import UserInfo from './UserInfo'
import Pages from '../comments/Pages'

function Answer() {
  const [answerInfo, setAnswerInfo] = useState([])
  const [users, setUsers] = useState([])
  const [commentPages, setCommentPages] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAPI = async () => {
      const postInfo = await API.get(`problems/${urlID('answer')}?page=${commentPages}`)
      const comments = postInfo.comments
      const currentUser = {
        author: { name: postInfo.author.name, avatar: postInfo.author.avatar },
        content: postInfo.content,
        created_at: postInfo.created_at
      }
      comments.unshift(currentUser)
      setAnswerInfo(postInfo)
      setUsers(comments)
      setMaxPage(postInfo.comments_total_pages)
      setLoading(true)
    }
    getAPI()
  }, [commentPages])
  return(
    <div>
      <div className="single-article-title">
        <div className="single-article-title-goback">
          <a href="/posts">《 Back</a>
        </div>
        <div className="single-article-title-word">
          { answerInfo.title }
        </div>
        <div className="single-article-title-icon">
        </div>
      </div>
      <div className="single-article-content">
        <div className="single-article-content-wrap">
          <div className="single-article-content-author">
          </div>
          <div className="single-article-content-body">
            <div className="markdown-body">
              <UserInfo users={ users }/>
            </div>
          </div>
        </div> 
      </div> 
      { loading ?
      <Pages commentPages={ commentPages }
             setCommentPages={ setCommentPages }
             maxPage={ maxPage } /> 
      : null }
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  const answerPage = document.getElementById('single-article-answer')
  if(answerPage) {
    ReactDOM.render(<Answer />, answerPage)
  }
})