import { useSelector } from "react-redux";
import { selectPosts } from "../../actions/postsSlice";
import { CreatePost, Post } from "../../components/Post";
import { useGetPostsQuery } from "../../services/posts";

function Network() {
  const posts = useSelector(selectPosts);
  const { data, isLoading, isFetching, isError } = useGetPostsQuery();

  if (isLoading) {
    return <p>loading posts...</p>;
  }

  return (
    <div>
      <p>network</p>
      <CreatePost />
      {data?.results.map((post) => (
        <Post
          key={post.id}
          id={String(post.id)}
          content={post.content}
          title={post.title}
        />
      ))}
    </div>
  );
}

export default Network;
