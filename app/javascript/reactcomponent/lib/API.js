const token = document.querySelector('meta[name=csrf-token]').content

export default function API(url, action, data) {
  if(data != undefined) {
    return fetch(url, OutputAPI(action, data))
  }else {
    return fetch(url).then(res => res.json())
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