import React from 'react'
import marked from 'marked'

export default function CurrentList({ listAmount }) {
  return listAmount.map(list => {
    const { id, title ,content } = list
    return <SearchDisplayList key={ id } 
                              id={ id } 
                              title={ title } 
                              content={ content } /> 
  })
}
  
function SearchDisplayList({ title, content, id }) {
  return(
    <div className="discuss">
      <img src="https://picsum.photos/50/50?grayscale" alt="jpg" />
      <div>      
        <h2><a href={ `posts/${id}` }>{ title }</a></h2>
        <h3 dangerouslySetInnerHTML={ {__html: marked(`${content.slice(0, 10).replace('```', '')}...`)} }>
        </h3>
      </div>
    </div>
  )
}