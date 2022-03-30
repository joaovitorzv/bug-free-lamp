import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import {
  AiOutlineDelete as DeleteIcon,
  AiOutlineEdit as EditIcon,
} from "react-icons/ai";

import { deletePost, editPost } from "../../actions/feedSlice";
import { PostType } from "../../types/types";

import "./postStyles.css";

interface PostProps {
  postData: PostType;
}

function Post({ postData }: PostProps) {
  const [edit, setEdit] = useState(false);

  const [title, setEditTile] = useState(postData.title);
  const [content, setEditContent] = useState(postData.content);

  const dispatch = useDispatch();

  function handleEditPost(id: number) {
    if (!edit) {
      return setEdit(true);
    } else {
      dispatch(editPost({ title, content, id }));
      setEdit(false);
    }
  }

  return (
    <section className="postContainer">
      <header>
        <h2>{postData.title}</h2>

        <div className="postActions">
          <button
            className="editButton"
            onClick={() => handleEditPost(postData.id)}
          >
            {edit ? "save" : <EditIcon size={18} />}
          </button>
          <button
            className="deleteButton"
            onClick={() => dispatch(deletePost(postData.id))}
          >
            <DeleteIcon size={18} />
          </button>
        </div>
      </header>
      <div className="postBody">
        <div className="postInfo">
          <h4>@{postData.username}</h4>
          <span>
            {formatDistanceToNow(new Date(postData.created_datetime))}
          </span>
        </div>
        <p>{postData.content}</p>
      </div>

      <form style={{ display: edit ? "block" : "none" }}>
        <input value={title} onChange={(e) => setEditTile(e.target.value)} />
        <input
          value={content}
          onChange={(e) => setEditContent(e.target.value)}
        />
      </form>
    </section>
  );
}

export default Post;
