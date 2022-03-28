import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import {
  AiOutlineDelete as DeleteIcon,
  AiOutlineEdit as EditIcon,
} from "react-icons/ai";

import { postDeleted, postEdited } from "../../actions/postsSlice";
import { useDeletePostMutation } from "../../services/posts";
import { PostType } from "../../services/types";

import "./postStyles.css";

function Post({ id, title, content, username, created_datetime }: PostType) {
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

  const [deletePost] = useDeletePostMutation();

  return (
    <section key={id} className="postContainer">
      <header>
        <h2>{title}</h2>

        <div className="postActions">
          <button
            className="editButton"
            onClick={() => handleEditPost(String(id))}
          >
            {edit ? "save" : <EditIcon size={18} />}
          </button>
          <button
            className="deleteButton"
            onClick={() => deletePost(String(id))}
          >
            <DeleteIcon size={18} />
          </button>
        </div>
      </header>
      <div className="postBody">
        <div className="postInfo">
          <h4>@{username}</h4>
          <span>{formatDistanceToNow(new Date(created_datetime))}</span>
        </div>
        <p>{content}</p>
      </div>

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
    </section>
  );
}

export default Post;
