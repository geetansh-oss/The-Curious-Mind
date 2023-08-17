import {format} from "date-fns";
import { Link } from "react-router-dom";

const Post = ({_id, title, cover, createdAt, author}) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:5000/" + cover} alt="picture" />
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.userName}
          </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
        </p>
      </div>
    </div>
  );
}

export default Post
