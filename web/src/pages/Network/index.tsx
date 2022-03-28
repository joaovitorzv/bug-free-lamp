import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "../../actions/postsSlice";
import { CreatePost, Post } from "../../components/Post";
import { useGetPostsQuery, useLazyGetPostsQuery } from "../../services/posts";
import { PostType } from "../../services/types";
import "./styles.css";

const PAGE_LIMIT = 3;

function Network() {
  const [offset, setOffset] = useState(0);
  const currPage = useGetPostsQuery(offset);
  const [] = useLazyGetPostsQuery();

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    if (currPage.data?.results) {
      setPosts((prev) => [...prev, ...currPage.data!.results]);
    }
  }, [currPage.data]);

  if (currPage.isLoading) {
    return <p>loading posts...</p>;
  }

  if (currPage.isError) {
    return <p>something bad happened.</p>;
  }

  return (
    <div className="networkContainer">
      <CreatePost />
      {currPage.data?.results.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          title={post.title}
          created_datetime={post.created_datetime}
          username={post.username}
        />
      ))}

      <button onClick={() => setOffset((prev) => prev + PAGE_LIMIT)}>
        load more
      </button>
    </div>
  );
}

export default Network;
