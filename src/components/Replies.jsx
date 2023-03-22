import Reply from "./Reply";

import classes from "./Replies.module.css";

function Replies(props) {
  return (
    <div className={classes.container}>
      {props.replies.map((reply) => (
        <Reply
          commentId={props.commentId}
          key={reply.id}
          id={reply.id}
          content={reply.content}
          createdAt={reply.createdAt}
          score={reply.score}
          user={reply.user}
          replyingTo={reply.replyingTo}
        />
      ))}
    </div>
  );
}

export default Replies;
