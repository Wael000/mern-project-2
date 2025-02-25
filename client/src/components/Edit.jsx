import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

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

const Edit = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('summary', summary)
        formData.append('content', content)
        formData.append('file', file?.[0])
        const response = await fetch(`http://localhost:3000/edit/${id}`, {
            method: "PUT",
            body: formData,
            credentials: 'include'
        })
        if (response.ok) {
            navigate(`/post/${id}`)
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setSummary(data.summary)
                setContent(data.content)
            })
    }, [id])

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
      <button type="submit">Edit</button>
    </form>
  )
}

export default Edit
