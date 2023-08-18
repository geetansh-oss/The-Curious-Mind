import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/App.css";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async(e)=>{
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    await axios.post('http://localhost:5000/createPost',data,{
      withCredentials : "include",
    }).then(()=>{
      setRedirect(true);
    });
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  
  return (
    <>
      <form onSubmit={createNewPost}>
        <input type="title" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <input type="summary" placeholder="Summary" value={summary} onChange={(e)=>{setSummary(e.target.value)}} />
        <input type="file" onChange={(e)=>{setFiles(e.target.files)}}/>
        <ReactQuill value={content} onChange={(e)=>{setContent(e)}}/>
        <button id="posts">Create Post</button>
    </form>
    </>
  );
};

export default CreatePost;
