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
      <div className="pic"><img src={ author.avatar } alt="jpg" /></div>
      <div>      
        <h2><a href={ `posts/${id}` }>{ title }</a></h2>
        <h3 dangerouslySetInnerHTML={ {__html: marked(`${content.slice(0, 10).replace('```', '')}...`)} }>
        </h3>
      </div>
      <div>
        <div>文章作者: <span>{ author.name }</span></div>
        <div>
          最新回覆: <span>{ newComment.name }</span>
        </div>
      </div>
    </div>
  )
}