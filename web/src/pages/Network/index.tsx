import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
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

      <motion.div
        animate={{ y: [-10, 0], opacity: [0, 1] }}
        transition={{ duration: 0.8 }}
      >
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </motion.div>

      <button onClick={handleNextPage}>load more</button>
    </div>
  );
}

export default Network;
