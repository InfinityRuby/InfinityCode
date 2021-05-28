function url() {
  const url = window.location.href
  const postID = url.substring(url.lastIndexOf('/') + 1)
  return postID
}

function url2() {
  const url = window.location.href
  const currentURL = url.replace('/edit', '')
  const currentEditID = currentURL.substring(currentURL.lastIndexOf('/') + 1)
  return currentEditID
}

export { url, url2 }