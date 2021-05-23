import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'

function Comments_user(props) {
  const comments = props
  return(
    <div className="single_article_user_comments">
      <div className="single_article_user_title">
          <img src="https://picsum.photos/50/50?grayscale" alt="comments_img" />
          <h4>王小明</h4>
          <span>0</span>
          <span>a few seconds ago</span>
      </div>
      <div className="single_article_user_content">{comments.content}</div>
    </div>
  )
}

function Comments() {
  const [commentCount, setCommentCount] = useState([])
  const [commentPage, setCommentPage] = useState(1)
  const commentTotal = commentCount.slice(commentPage * 6 - 6, commentPage * 6).map(comments => {
    return <Comments_user key={comments.id} content={comments.comment} />
  })

  const comment_button = document.getElementById('comment_button')
  const comment_texarea = document.getElementById('comment_texarea')

  useEffect(() => {
    let url = window.location.href;  
    let id = url.substring(url.lastIndexOf('/') + 1);
    fetch(`/jsons/commentsJson/${id}`)
    .then(res => res.json())
    .then(posts => setCommentCount(posts))
  }, [])

  comment_button.addEventListener('click', () => {
    const myself_comment_api = {id: commentCount.length + 1 ,comment: comment_texarea.value}
    const new_comment_arr = commentCount.concat(myself_comment_api)

    new_comment_arr.pop()
    new_comment_arr.unshift(myself_comment_api)
    setCommentCount(new_comment_arr)
    setCommentPage(1)
    setTimeout(() => comment_texarea.value = '', 0)
  })

  const previousPage = () => commentPage > 1 && setCommentPage(commentPage - 1)  
  const nextPage = () => commentPage * 6 < commentCount.length && setCommentPage(commentPage + 1)
  const changePage = event => commentPage * 6 < commentCount.length + 6 && setCommentPage(Number(event.target.textContent))
  const lastPage = event => setCommentPage(Number(event.target.textContent))
  const returnPage = () => setCommentPage(1)

  return(
    <div>
      { commentTotal }
      <div className="single_article_page">
          <span onClick={previousPage}>◀</span>
         { commentPage >= 5 ?  <span onClick={returnPage}>{1}</span> : null}
         { commentPage >= 5 ? <h5>...</h5> : null}
         { commentPage * 6 < commentCount.length + 6 ? <span className="first_button_color" onClick={changePage}>{commentPage}</span> : null }
         { commentPage * 6 < commentCount.length - 6 ?  <span id="2" onClick={changePage}>{commentPage + 1}</span> : null }
         { commentPage * 6 < commentCount.length -12 ? <span id="3" onClick={changePage}>{commentPage + 2}</span> : null }
         { commentPage * 6 < commentCount.length - 18 ? <span id="4" onClick={changePage}>{commentPage + 3}</span> : null }
         { commentPage * 6 < commentCount.length - 24 ? <span id="5" onClick={changePage}>{commentPage + 4}</span> : null }
         { commentPage < Math.ceil(commentCount.length / 6) ? <h5>...</h5> : null}
         { commentPage < Math.ceil(commentCount.length / 6) ? <span onClick={lastPage}>{Math.ceil(commentCount.length / 6)}</span> : null }
          <span onClick={nextPage}>▶</span>
      </div>
    </div>
  )
}

document.addEventListener('turbolinks:load', () => {
  if(document.getElementById('single_article_user_comments')){
    ReactDOM.render(
      <Comments />,
        document.getElementById('single_article_user_comments')
    )
  }
})