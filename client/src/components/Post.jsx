import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({_id, title, summary, content, file, createdAt, author}) => {
  return (
    <div className="container-ba">
      <Link to={`/post/${_id}`}>
        <img src={"http://localhost:3000/uploads/" + file}></img>
      </Link>
    <div className='container-baa'>
      <Link to={`/post/${_id}`}>
        <h1>{title}</h1>
      </Link>
      <div className="container-baaa">
        <p>{summary}</p>
        <p>{author.name} {format(new Date(createdAt), "MMM d yyyy HH:mm")}</p>
      </div>
    </div>
  </div>
  )
}

export default Post
