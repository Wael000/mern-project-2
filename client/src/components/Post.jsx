import React from 'react'
import { format } from 'date-fns'

const Post = ({title, summary, content, file, createdAt}) => {
  return (
    <div className="container-ba">
    <img src="https://www.autoblog.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MjEyMDI3NTQ2MjM2MTY4MTY4/tesla-model-y-juniper.webp"></img>
    <div className='container-baa'>
      <h1>{title}</h1>
      <div className="container-baaa">
        <p>{summary}</p>
        <p>Larry PrintzFeb {format(new Date(createdAt), "MMM d yyyy HH:mm")}</p>
      </div>
    </div>
  </div>
  )
}

export default Post
