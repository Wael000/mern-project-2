import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()
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
        </div>
    </div>
  )
}

export default PostDetail
