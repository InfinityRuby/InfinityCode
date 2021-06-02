const token = document.querySelector('meta[name=csrf-token]').content

export default function API(action, data, url) {  
  return fetch(`/api/v1/${url}`, OutputAPI(action, data))
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