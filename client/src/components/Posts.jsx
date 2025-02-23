import React from 'react'
import { useEffect, useState } from 'react'
import Post from './Post'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  return (
    <div className="container-b">
      {posts.map(post => <Post key={post._id} {...post} />)}
    {/* <div className="container-ba">
      <img src="https://www.autoblog.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MjEwMjAyMzgyNDM1NDI3ODg3/2024dodgechargerdaytonascatpackshownindiamondblackexteriorcolor.webp"></img>
      <div className='container-baa'>
        <h1>Dodge hints at a sub-$30,000 sports car: Could it happen?</h1>
        <div className="container-baaa">
          <p>Between spec ’d-out Durangos and loud-mouthed Hellcats, Dodge has spent years building its reputation on big, powerful muscle cars with equally hefty price tags. But in a surprising turn, Dodge CEO Matt McAlear hinted at a potential shift—one that could see the brand introducing a sub-$30,000 sports car.</p>
          <p>Elijah Nicholson-MessmerFeb 14, 2025</p>
        </div>
      </div>
    </div>
    <div className="container-ba">
      <img src="https://www.autoblog.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MjEyODM2ODgwNzQ2Njg2MDgw/1973-monteverdi-high-speed-375-l-.webp"></img>
      <div className='container-baa'>
        <h1>Have you ever wanted a Swiss sports car with an American V8?</h1>
        <div className="container-baaa">
          <p>Did you know the Swiss also made cars once upon a time? And did you know you can buy one of the more obscure ones on Bring a Trailer? What if I also told you that it housed an American V8 under its long European hood?.</p>
          <p>Gabriel IonicaFeb 14, 2025</p>
        </div>
      </div>
    </div> */}
  </div>
  )
}

export default Posts
