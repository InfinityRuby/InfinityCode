import React from 'react'
import API from '../lib/API'
import allID from '../lib/ID'

function CommentsAction({ commentRef, setCurrentComment, currentComment, email, loginUser }) { 
  const editComment = () => {  
    setCurrentComment(commentsID(commentRef))
    setTimeout(() => { document.getElementById(`${commentsID(commentRef)}`).focus() }, 0)
  }

  const destroyComment = () => {    
    if(confirm('確認要刪除這則留言？')) {
    commentRef.current.style = 'display: none'
    API('DELETE', '', `/api/v1/posts/${allID('post')}/comments/${commentsID(commentRef)}`)
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