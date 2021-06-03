const token = document.querySelector('meta[name=csrf-token]').content

export default function API(url, action, data) {  
  return fetch(url, OutputAPI(action, data)).then(res => res.json())
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