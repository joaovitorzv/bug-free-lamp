import { useSelector } from "react-redux";
import { selectPosts } from "../../actions/postsSlice";
import { CreatePost, Post } from "../../components/Post";

function Network() {
  const posts = useSelector(selectPosts);

  return (
    <div>
      <p>network</p>
      <CreatePost />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          title={post.title}
        />
      ))}
    </div>
  );
}

export default Network;
