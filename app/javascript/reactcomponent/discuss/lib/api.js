import allID from './ID'

const token = document.querySelector('meta[name=csrf-token]').content

export default function API(action, status, inputValue, postURL) {  
  const commentData = { content: inputValue }
  const postData = { title: inputValue, content: postURL } 
  
  if(status == 'postNew') {
    fetch(`/api/v1/posts`, actionCommentAPI(action, postData))  
  }else if(status == 'postEdit' || status == 'postDelete') {
    fetch(`/api/v1/posts/${allID('edit')}`, actionCommentAPI(action, postData))
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