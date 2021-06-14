import React from 'react'
import marked from 'marked'

export default function CurrentList({ lists }) {
  return lists.map(list => {
    const { id, title , content, newest_comment_author, author } = list
    return <SearchDisplayList key={ id } 
                              id={ id } 
                              title={ title } 
                              content={ content }
                              author={ author }
                              newComment={ newest_comment_author } /> 
  })
}
  
function SearchDisplayList({ title, content, id, newComment, author }) {
  return(
    <div className="discuss">
      { content ? <div className="pic"><img src={ author.avatar } alt="jpg" /></div> : null }
      <div>      
        <h2><a href={ content ? `posts/${id}` : `posts/${id}/answer` }>{ title }</a></h2>
        { content ?
        <h3 dangerouslySetInnerHTML={ {__html: marked(`${content.slice(0, 10).replace('```', '')}...`)} }>
        </h3>
        : null }
      </div>
      { content ?
      <div>
        <div>文章作者: <span>{ author.name }</span></div>
        <div>最新回覆: <span>{ newComment.name }</span></div>
      </div>
      : null }
    </div>
  )
}