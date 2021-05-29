export default function allID(type) {
  const url = window.location.href
  if(type == 'edit') {
    const editID = url.replace('/edit', '')
    const currentID = editID.substring(editID.lastIndexOf('/') + 1)
    return currentID
  }else if(type == 'post'){
    const currentID = url.substring(url.lastIndexOf('/') + 1)
    return currentID
  }
}