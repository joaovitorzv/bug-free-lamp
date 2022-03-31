import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../../redux/store";
import { selectSession } from "../../../actions/sessionSlice";
import { createPost } from "../../../actions/feedSlice";
import InputLabel from "../../Input";
import useFormError from "../../../hooks/useFormError";

import "./createPostStyles.css";

function CreatePost() {
  const session = useSelector(selectSession);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useFormError();
  const [isCreating, setIsCreating] = useState(false);

  function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.length === 0 || content.length === 0) {
      return setFormError({
        error: true,
        message: "You can't create posts with empty fields",
      });
    }
    setIsCreating(true);
    dispatch(
      createPost({ content, title, username: session.username as string })
    );
    setTitle("");
    setContent("");
    setFormError({ error: false, message: null });
    setIsCreating(false);
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
            {isCreating ? "creating" : "create"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
