import { url2 } from '../lib/url'

const token = document.querySelector('meta[name=csrf-token]').content

export default function api(action, status, inputValue, postURL) {  // 為什麼會有第四參數，因為不知道為什麼Comments.js直接import postID卻吃不到
  const commentData = { content: inputValue }
  const postData = { title: inputValue, content: postURL} // 這邊的postURL之後要換掉
  
  if(status == 'postNew') {
    fetch(`/api/v1/posts`, actionCommentAPI(action, postData))  
  }else if(status == 'postEdit' || status == 'postDelete') {
    fetch(`/api/v1/posts/${url2()}`, actionCommentAPI(action, postData))
  }else {
    status ? 
            fetch(`/api/v1/posts/${postURL}/comments/${status}`, actionCommentAPI(action, commentData)) 
            : 
            fetch(`/api/v1/posts/${postURL}/comments`, actionCommentAPI(action, commentData))
  }
}

const actionCommentAPI = (action, apiData) => {
  const actionCommentData = {
    method: action,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
  },
    body: JSON.stringify(apiData)
  }
  return actionCommentData
}