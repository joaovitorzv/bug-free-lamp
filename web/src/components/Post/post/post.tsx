import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { selectSession } from "../../../actions/sessionSlice";
import { PostType } from "../../../types/posts";
import PostActions from "../postActions/postActions";

import "./postStyles.css";

interface PostProps {
  postData: PostType;
}

function Post({ postData }: PostProps) {
  const session = useSelector(selectSession);
  return (
    <section className="postContainer">
      <header>
        <h2>{postData.title}</h2>

        {session.username?.toLowerCase() ===
          postData.username.toLowerCase() && (
          <PostActions postData={postData} />
        )}
      </header>
      <div className="postBody">
        <div className="postInfo">
          <h4>@{postData.username}</h4>
          <span>
            {formatDistanceToNow(new Date(postData.created_datetime))}
          </span>
        </div>
        <p>{postData.content}</p>
      </div>
    </section>
  );
}

export default Post;
