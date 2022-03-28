import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../../actions/postsSlice";
import InputLabel from "../Input";

import "./createPostStyles.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const dispatch = useDispatch();

  return (
    <section className="createPostContainer">
      <h2>Hey, what's on your mind?</h2>
      <form className="postForm">
        <InputLabel label="Title" htmlFor="postTitle">
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => onTitleChanged(e)}
          />
        </InputLabel>

        <InputLabel label="Content" htmlFor="postcontent">
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={(e) => onContentChanged(e)}
          />
        </InputLabel>

        <div className="createPostActions">
          <button
            type="button"
            onClick={() => dispatch(postAdded(title, content))}
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
