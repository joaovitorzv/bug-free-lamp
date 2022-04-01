import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchPosts } from "../../actions/feedSlice";
import { selectSession } from "../../actions/sessionSlice";
import { CreatePost, Post } from "../../components/Post";
import { RootState, useAppDispatch } from "../../redux/store";
import { POSTS_PER_PAGE } from "../../types/posts.d";
import BackToTop from "../../components/BackToTop";
import "./styles.css";

function Network() {
  const [offset, setOffset] = useState(0);

  const dispatch = useAppDispatch();
  const session = useSelector(selectSession);
  const feed = useSelector((state: RootState) => state.feed);

  const handleNextPage = useCallback(async () => {
    setOffset((prev) => prev + POSTS_PER_PAGE);
    await dispatch(fetchPosts(offset)).unwrap();
  }, [offset, dispatch]);

  useEffect(() => {
    if (feed.status === "idle") {
      handleNextPage();
    }
  }, [feed, handleNextPage]);

  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    if (offset >= feed.posts_count) {
      return setReachedEnd(true);
    }
    setReachedEnd(false);
  }, [offset, feed.posts_count]);

  const lastButOnePostRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    function handleInfiniteScroll() {
      if (
        !reachedEnd &&
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
  }, [handleNextPage, reachedEnd]);

  const [backToTop, setBackToTop] = useState(false);
  const [lastScrollYCord, setLastScrollYCord] = useState(0);
  useEffect(() => {
    const scrolledToViewHeight = window.scrollY > window.innerHeight;

    function handleBackToTop() {
      if (scrolledToViewHeight && lastScrollYCord > window.scrollY) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }

      setLastScrollYCord(window.scrollY);
    }

    document.addEventListener("scroll", handleBackToTop);
    return () => {
      document.removeEventListener("scroll", handleBackToTop);
    };
  }, [lastScrollYCord]);

  return (
    <div className="networkContainer" data-testid="network">
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
      <BackToTop isInvisible={backToTop} />
      <div className="feedEnd">
        {reachedEnd && <h4>You've reached the end.</h4>}
      </div>
    </div>
  );
}

export default Network;
