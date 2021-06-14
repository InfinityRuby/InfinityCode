import React from 'react'
import marked from 'marked'

export default function UserInfo({ users }) {
  return users.map((user, index) => {
    const { content, author, created_at } = user
    const { name, avatar } = author
    return <UserCode key={ index }
                     content={ content }
                     name={ name }
                     avatar={ avatar }
                     createTime={ created_at } />
  })
}
  
function UserCode({ content, name, avatar, createTime }) {
  return(
    <div className="user-code">
      <div className="wrap">
        <div>
          <img src={ avatar } alt="/default.png" />
          <span>{ name }</span>
          <span>{ createTime.slice(0, 10) }</span>
        </div>
        <div className="markdown-body" dangerouslySetInnerHTML=
        {{ __html: marked('```\n'+`${content}\n`+'```')}}></div>
      </div>
    </div>
  )
}