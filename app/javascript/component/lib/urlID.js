export default function urlID(type) {
  let url = window.location.href
  let currentID
  if(type == 'edit') {
    url = url.replace('/edit', '')
  }
  currentID = url.substring(url.lastIndexOf('/') + 1)   
  return currentID
}