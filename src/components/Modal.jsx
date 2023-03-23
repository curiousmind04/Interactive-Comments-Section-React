import classes from "./Modal.module.css";

function Modal(props) {
  const closeModalHandler = () => {
    props.closeModal();
  };

  const deleteComment = () => {
    props.onDelete();
  };

  return (
    <>
      <div className={classes.backdrop} onClick={closeModalHandler}></div>
      <div className={classes.container}>
        <p>Delete comment</p>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div>
          <button className={classes.btn1} onClick={closeModalHandler}>
            No, Cancel
          </button>
          <button className={classes.btn2} onClick={deleteComment}>
            Yes, Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
