import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from './UserContext'

const PostDetail = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()
    const { user } = useContext(UserContext)

    console.log(user)

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])

  return (
    <div className="post-detail">
        <div className='post-detail-image'>
            <img src={"http://localhost:3000/uploads/" + post.file}></img>
        </div>
        <div className='post-detail-description'>
            <h1>{post.title}</h1>
            <div className='post-detail-content' dangerouslySetInnerHTML={{__html: post.content}}></div>
            {user.id === post.author?._id && 
            <Link to={`/post/${post._id}/edit`}>
                <button>Edit</button>
            </Link>}
        </div>
    </div>
  )
}

export default PostDetail
