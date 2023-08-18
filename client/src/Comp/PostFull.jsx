import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {format} from "date-fns";

const PostFull = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/post/${params.id}`).then((res) => {
      setPost(res.data);
    });
  }, []);

  if (!post) return "";
  return (
    <>
      <div>
        <h1 className="tiltle">{post.title}</h1>
        <span className="author">{post.author.userName}</span>
        <span id="date">{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
        <img src={`http://localhost:5000/${post.cover}`} alt="picture" />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
};

export default PostFull;
