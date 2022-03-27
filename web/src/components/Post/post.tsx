import { useState } from "react";
import { useDispatch } from "react-redux";
import { postDeleted, postEdited } from "../../actions/postsSlice";

interface PostProps {
  id: string;
  title: string;
  content: string;
}

function Post({ id, title, content }: PostProps) {
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
}

export default Post;
