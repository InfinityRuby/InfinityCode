import React from 'react'
import marked from 'marked'

export default function CurrentList({ list }) {
  return list.map(list => {
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
      <img src={ author.avatar } alt="jpg" />
      <div>      
        <h2><a href={ `posts/${id}` }>{ title }</a></h2>
        <h3 dangerouslySetInnerHTML={ {__html: marked(`${content.slice(0, 10).replace('```', '')}...`)} }>
        </h3>
      </div>
      <div>
        <div>文章作者: <span>{ author.name }</span></div>
        <div>
          最新回覆: { newComment.name == undefined ? <span>無</span> : <span>{ newComment.name }</span> }
        </div>
      </div>
    </div>
  )
}