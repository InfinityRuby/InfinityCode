import React, { useEffect } from 'react'
import API from 'component/lib/API'

function CommentsAction({ commentRef, setCurrentComment, currentComment, email, loginUser }) { 
  useEffect(() => {
    const targetComment = document.getElementById(commentsID(commentRef))
    if(targetComment) {
      targetComment.focus()
    }
  }, [currentComment])
  
  const editComment = () => {  
    setCurrentComment(commentsID(commentRef))
  }

  const destroyComment = () => {    
    if(confirm('確認要刪除這則留言？')) {
    commentRef.current.style = 'display: none'
    API.delete(`/api/v1/comments/${commentsID(commentRef)}`)
    } 
  }
  
  const cancelEditComment = () => { setCurrentComment(0) }

  return(
    <div className="user-comments-action">
      { currentComment 
      ? 
        <button onClick={ cancelEditComment }>取消</button> 
        : 
      <div>
        { `${email}` == `${loginUser}` ? 
        <div>
          <button onClick={ editComment }>編輯</button>
          <button onClick={ destroyComment }>刪除</button>
        </div> : null }
      </div> 
      }
    </div>
  )
}

function commentsID(commentRef){
  return commentRef.current.dataset.id
}

export { CommentsAction, commentsID }