import { useEffect, useState } from "react";
import {
  AiOutlineDelete as DeleteIcon,
  AiOutlineEdit as EditIcon,
} from "react-icons/ai";
import useFormError from "../../../hooks/useFormError";
import { useAppDispatch } from "../../../redux/store";
import { deletePost, editPost } from "../../../actions/feedSlice";
import * as Modal from "../../Modal";
import { PostType } from "../../../types/posts";
import "./postActions.css";

function PostActions({ postData }: { postData: PostType }) {
  const dispatch = useAppDispatch();

  const [deletePostDialog, setDeletePostDialog] = useState(false);
  const [editPostDialog, setEditPostDialog] = useState(false);

  const [title, setEditTitle] = useState(postData.title);
  const [content, setEditContent] = useState(postData.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useFormError();

  const anyFieldEmpty = title.length === 0 || content.length === 0;

  // re-fill dialog fields with server data if is rerendered
  // there is probably a better way to do it, but I can't find
  useEffect(() => {
    setEditTitle(postData.title);
    setEditContent(postData.content);
  }, [editPostDialog, setEditContent, postData.title, postData.content]);

  async function handleEditPost(
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) {
    e.preventDefault();

    if (anyFieldEmpty) {
      return setFormError({
        error: true,
        message: "You can't leave fields empty",
      });
    }

    setIsSubmitting(true);
    await dispatch(editPost({ title, content, id })).unwrap();
    setEditPostDialog(false);
    setIsSubmitting(false);
  }

  return (
    <div className="postActions">
      <button className="editButton" onClick={() => setEditPostDialog(true)}>
        <EditIcon size={18} />
      </button>
      <Modal.Modal
        header="Editing Post"
        description="Save to see your changes take effect"
        isOpen={editPostDialog}
        onDismiss={() => setEditPostDialog(false)}
      >
        <form onSubmit={(e) => handleEditPost(e, postData.id)}>
          <div className="inputGroup">
            <input
              value={title}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              value={content}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
          {formError.error && (
            <p className="errorMessage">{formError.message}</p>
          )}
          <Modal.Actions>
            <button onClick={() => setEditPostDialog(false)}>Cancel</button>
            <button
              type="submit"
              className={anyFieldEmpty ? "disabledButton" : "primaryButton"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "saving..." : "save"}
            </button>
          </Modal.Actions>
        </form>
      </Modal.Modal>

      <button
        className="deleteButton"
        onClick={() => setDeletePostDialog(true)}
      >
        <DeleteIcon size={18} />
      </button>
      <Modal.Modal
        header="Are you sure?"
        description={`You're about to delete your "${postData.title}" post, this action can't be reverted`}
        isOpen={deletePostDialog}
        onDismiss={setDeletePostDialog}
      >
        <Modal.Actions>
          <button onClick={() => setDeletePostDialog(false)}>Cancel</button>
          <button
            onClick={() => dispatch(deletePost(postData.id))}
            className="warnButton"
          >
            Delete
          </button>
        </Modal.Actions>
      </Modal.Modal>
    </div>
  );
}

export default PostActions;
