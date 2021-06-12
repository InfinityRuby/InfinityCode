import axios from 'axios'

const token = document.querySelector('meta[name=csrf-token]').content
axios.defaults.headers.common[`X-CSRF-Token`] = token

const API = {
  create(url, apiData) {
    return axios.post(`/api/v1/${url}`, apiData).then(post => post.data)
  },
  
  put(url, apiData) {
    return axios.put(`/api/v1/${url}`, apiData).then(post => post.data)
  },

  delete(url) {
    return axios.delete(url)
  },
  
  get(url) {
    return axios.get(`/api/v1/${url}`).then(post => post.data)
  },
}

export default API