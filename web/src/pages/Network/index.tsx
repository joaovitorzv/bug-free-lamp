import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  postAdded,
  postDeleted,
  postEdited,
} from "../../actions/postsSlice";

export const AddPostForm = () => {
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
};

interface PostProps {
  id: string;
  title: string;
  content: string;
}

const Post = ({ id, title, content }: PostProps) => {
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTile] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const dispatch = useDispatch();

  function handleEditPost(id: string) {
    if (!edit) {
      return setEdit(true);
    } else {
      dispatch(postEdited({ id, title: editTitle, content: editContent }));
      setEdit(false);
    }
  }

  return (
    <div key={id}>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={() => dispatch(postDeleted(id))}>delete post</button>
      <div style={{ display: edit ? "block" : "none" }}>
        <input
          value={editTitle}
          onChange={(e) => setEditTile(e.target.value)}
        />
        <input
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
      </div>
      <button onClick={() => handleEditPost(id)}>
        {edit ? "save" : "edit"}
      </button>
    </div>
  );
};

function Network() {
  const posts = useSelector(selectPosts);

  return (
    <div>
      <p>network</p>
      <AddPostForm />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          title={post.title}
        />
      ))}
    </div>
  );
}

export default Network;
