import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSession } from "../../actions/sessionSlice";
import { createPost } from "../../actions/feedSlice";
import InputLabel from "../Input";

import "./createPostStyles.css";

function CreatePost() {
  const session = useSelector(selectSession);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO: Empty fields and place a loading/error status of dispatch request
    dispatch(
      createPost({ content, title, username: session.username as string })
    );
  }

  return (
    <section className="createPostContainer">
      <h2>Hey, what's on your mind?</h2>
      <form className="postForm" onSubmit={handleCreatePost}>
        <InputLabel label="Title" htmlFor="postTitle">
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="The best title for your post"
            value={title}
            onChange={(e) => onTitleChanged(e)}
          />
        </InputLabel>

        <InputLabel label="Content" htmlFor="postcontent">
          <textarea
            id="postContent"
            name="postContent"
            placeholder="Write some interesting stuff..."
            value={content}
            onChange={(e) => onContentChanged(e)}
          />
        </InputLabel>

        <div className="createPostActions">
          <button type="submit">Create</button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
