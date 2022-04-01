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
import InputLabel from "../../Input";

function PostActions({ postData }: { postData: PostType }) {
  const dispatch = useAppDispatch();

  const [deletePostDialog, setDeletePostDialog] = useState(false);
  const [editPostDialog, setEditPostDialog] = useState(false);

  const [title, setEditTitle] = useState(postData.title);
  const [content, setEditContent] = useState(postData.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useFormError();

  const anyFieldEmpty = title.length === 0 || content.length === 0;

  // re-fill dialog fields with server data if is re-rendered
  // there is probably a better way to do it
  useEffect(() => {
    setEditTitle(postData.title);
    setEditContent(postData.content);
    setFormError({ error: false, message: null });
  }, [
    editPostDialog,
    setEditContent,
    setFormError,
    postData.title,
    postData.content,
  ]);

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
      <button
        aria-label="edit post"
        className="editButton"
        onClick={() => setEditPostDialog(true)}
        data-testid="edit-post-btn"
      >
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
            <InputLabel label="Title" htmlFor="edit-title">
              <input
                value={title}
                id="edit-title"
                name="edit-title"
                onChange={(e) => setEditTitle(e.target.value)}
                data-testid="edit-title-input"
              />
            </InputLabel>
            <InputLabel label="Content" htmlFor="edit-content">
              <textarea
                value={content}
                id="edit-content"
                name="edit-content"
                onChange={(e) => setEditContent(e.target.value)}
                data-testid="edit-content-input"
              />
            </InputLabel>
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
              data-testid="save-edit-btn"
            >
              {isSubmitting ? "saving..." : "save"}
            </button>
          </Modal.Actions>
        </form>
      </Modal.Modal>

      <button
        aria-label="delete post"
        className="deleteButton"
        onClick={() => setDeletePostDialog(true)}
        data-testid="delete-dialog-btn"
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
            data-testid="delete-post-btn"
          >
            Delete
          </button>
        </Modal.Actions>
      </Modal.Modal>
    </div>
  );
}

export default PostActions;
