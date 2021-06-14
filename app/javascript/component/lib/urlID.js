export default function urlID(type) {
  let url = window.location.href
  let currentID
  if(type == 'edit') {
    url = url.replace('/edit', '')
  }else if(type == 'answer') {
    url = url.replace('/answer', '')
  }
  currentID = url.substring(url.lastIndexOf('/') + 1)   
  return currentID
}