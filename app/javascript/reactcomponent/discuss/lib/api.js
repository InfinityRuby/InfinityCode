const url = window.location.href
const postID = url.substring(url.lastIndexOf('/') + 1)
const token = document.querySelector('meta[name=csrf-token]').content

function api(action, commentsID, inputValue = '', postURL) {  // 為什麼會有第四參數，因為不知道為什麼Comments.js直接import postID卻吃不到
  const apiData1 = { content: inputValue }
  const apiData2 = { title: inputValue, content: postURL} // 這邊的postURL之後要換掉

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
  
  if(commentsID == 'postNew') {
    fetch(`/api/v1/posts`, actionCommentAPI(action, apiData2))
  }else {
    commentsID ? 
               fetch(`/api/v1/posts/${postID}/comments/${commentsID}`, actionCommentAPI(action, apiData1)) 
               : 
               fetch(`/api/v1/posts/${postURL}/comments`, actionCommentAPI(action, apiData1))
  }
}

export { postID, api }