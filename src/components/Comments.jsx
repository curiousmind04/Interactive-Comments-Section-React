import Comment from "./Comment";

import classes from "./Comments.module.css";

function List(props) {
  return (
    <>
      <div className={classes.container}>
        {props.commentData &&
          props.commentData.comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              replies={comment.replies}
              score={comment.score}
              user={comment.user}
            />
          ))}
      </div>
    </>
  );
}

export default List;
