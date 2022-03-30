import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSession } from "../../../actions/sessionSlice";
import { createPost } from "../../../actions/feedSlice";
import InputLabel from "../../Input";
import useFormError from "../../../hooks/useFormError";

import "./createPostStyles.css";

function CreatePost() {
  const session = useSelector(selectSession);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useFormError();

  function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.length === 0 || content.length === 0) {
      return setFormError({
        error: true,
        message: "You can't create posts with empty fields",
      });
    }

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
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputLabel>

        <InputLabel label="Content" htmlFor="postcontent">
          <textarea
            id="postContent"
            name="postContent"
            placeholder="Write some interesting stuff..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputLabel>
        {formError.error && <p className="errorMessage">{formError.message}</p>}
        <div className="createPostActions">
          <button
            type="submit"
            className={
              title.length === 0 && content.length === 0 ? "disabledButton" : ""
            }
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
