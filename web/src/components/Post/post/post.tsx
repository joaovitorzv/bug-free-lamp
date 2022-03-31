import { forwardRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { selectSession } from "../../../actions/sessionSlice";
import { PostType } from "../../../types/posts";
import PostActions from "../postActions/postActions";
import { SessionState } from "../../../types/session";

import "./postStyles.css";

interface PostProps {
  post: PostType;
  session: SessionState;
}

const Post = forwardRef<HTMLElement, PostProps>(({ post, session }, ref) => (
  <section className="postContainer" ref={ref}>
    <header>
      <h2>{post.title}</h2>

      {session.username?.toLowerCase() === post.username.toLowerCase() && (
        <PostActions postData={post} />
      )}
    </header>

    <div className="postBody">
      <div className="postInfo">
        <h4>@{post.username}</h4>
        <span>{formatDistanceToNow(new Date(post.created_datetime))}</span>
      </div>
      <p>{post.content}</p>
    </div>
  </section>
));

export default Post;
