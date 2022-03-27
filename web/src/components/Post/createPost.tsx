import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../../actions/postsSlice";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const dispatch = useDispatch();

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => onTitleChanged(e)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => onContentChanged(e)}
        />
        <button
          type="button"
          onClick={() => dispatch(postAdded(title, content))}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
