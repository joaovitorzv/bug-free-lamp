import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, fetchPosts } from "../../actions/feedSlice";
import { CreatePost, Post } from "../../components/Post";
import { RootState } from "../../redux/store";
import "./styles.css";

const POSTS_PER_PAGE = 10;

function Network() {
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();
  const postStatus = useSelector((state: RootState) => state.feed.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts(offset));
    }
  }, [postStatus, dispatch, offset]);

  function handleNextPage() {
    dispatch(fetchPosts(offset + POSTS_PER_PAGE));
    setOffset((prev) => prev + POSTS_PER_PAGE);
  }

  const posts = useSelector(selectPosts);

  return (
    <div className="networkContainer">
      <CreatePost />
      {postStatus === "loading" ? (
        <div className="feedLoading">Retrieving posts...</div>
      ) : null}

      <div className="feed">
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </div>

      <button onClick={handleNextPage}>load more</button>
    </div>
  );
}

export default Network;
