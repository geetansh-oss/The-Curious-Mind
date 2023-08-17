import Post from "./Post"
import { useEffect, useState } from "react";
import axios from "axios";

const IndexPage =  ()=>{
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/post').then((res)=>{
      setPosts(res.data);
    })
  }, []);

  return (
    <>
    {posts.length > 0 && posts.map(post=>(
      <Post {...post}/>
      ))
    }
    </>
  );
}

export default IndexPage;
