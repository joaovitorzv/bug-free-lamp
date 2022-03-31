import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchPosts } from "../../actions/feedSlice";
import { selectSession } from "../../actions/sessionSlice";
import { CreatePost, Post } from "../../components/Post";
import { RootState, useAppDispatch } from "../../redux/store";
import "./styles.css";

const POSTS_PER_PAGE = 10;

function Network() {
  const [offset, setOffset] = useState(0);

  const dispatch = useAppDispatch();
  const session = useSelector(selectSession);
  const feed = useSelector((state: RootState) => state.feed);

  const handleNextPage = useCallback(async () => {
    await dispatch(fetchPosts(offset)).unwrap();
    setOffset((prev) => prev + POSTS_PER_PAGE);
  }, [offset, dispatch]);

  useEffect(() => {
    if (feed.status === "idle") {
      handleNextPage();
    }
  }, [feed, handleNextPage]);

  const lastButOnePostRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleInfiniteScroll() {
      console.log(lastButOnePostRef.current);
      console.log(
        lastButOnePostRef.current?.getBoundingClientRect().y,
        window.innerHeight
      );
      if (
        lastButOnePostRef.current &&
        lastButOnePostRef.current.getBoundingClientRect().y < window.innerHeight
      ) {
        lastButOnePostRef.current = null;
        handleNextPage();
      }
    }

    document.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      document.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleNextPage]);

  return (
    <div className="networkContainer">
      <CreatePost />
      {feed.status === "loading" && (
        <div className="feedLoading">Retrieving posts...</div>
      )}
      <motion.div
        animate={{ y: [-10, 0], opacity: [0, 1] }}
        transition={{ duration: 0.8 }}
      >
        {feed.posts.map((post, idx) => (
          <Post
            key={post.id}
            post={post}
            session={session}
            ref={idx === feed.posts.length - 2 ? lastButOnePostRef : undefined}
          />
        ))}
      </motion.div>
      {feed.status === "failed" && (
        <div style={{ textAlign: "center" }}>
          <p className="errorMessage">{feed.error}</p>
        </div>
      )}
      <button onClick={handleNextPage}>load</button>
    </div>
  );
}

export default Network;
