import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'

const modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

const Post = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState('')
    const [content, setContent] = useState('')
    console.log(file)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('summary', summary)
        formData.append('content', content)
        formData.append('file', file[0])
        const response = await fetch('http://localhost:3000/create', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        if (response.ok) {
            alert('Post created!')
        } else {
            alert('Post failed!')
        }
    }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input 
        type="text" 
        id="title" 
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)} />
      <label htmlFor="summary">Summary</label>
      <input 
        type="text" 
        id="summary" 
        name="summary"
        value={summary}
        onChange={e => setSummary(e.target.value)} />
      <label htmlFor="file" type="file" id="file" name="file" />
      <input 
        type="file" 
        id="file" 
        name="file"
        onChange={e => setFile(e.target.files)} />
      <ReactQuill 
        id="content" 
        name="content" 
        value={content} 
        onChange={e => setContent(e)}
        modules={modules} 
        formats={formats} />
      <button type="submit">Post</button>
    </form>
  )
}

export default Post
