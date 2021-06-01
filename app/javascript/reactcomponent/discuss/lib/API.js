import allID from './ID'

const token = document.querySelector('meta[name=csrf-token]').content

export default function API(action, data, route, id) {  
  if(route == 'editPost' || route == 'destroyPost') {
    fetch(`/api/v1/posts/${allID('edit')}`, OutputAPI(action, data))
  }else if(route == 'newPost') {
    return fetch(`/api/v1/posts`, OutputAPI(action, data))
  }else if(route == 'editComment' || route == 'destroyComment') {
    fetch(`/api/v1/posts/${allID('post')}/comments/${id}`, OutputAPI(action, data))
  }else if(route == 'newComment') {
    return fetch(`/api/v1/posts/${allID('post')}/comments`, OutputAPI(action, data))
  }
}

const OutputAPI = (action, apiData) => {
  const data = {
    method: action,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
  },
    body: JSON.stringify(apiData)
  }
  return data
}