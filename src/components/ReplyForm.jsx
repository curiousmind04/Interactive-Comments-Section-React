import { useContext } from "react";

import Context from "../context/context";
import classes from "./ReplyForm.module.css";

function ReplyForm(props) {
  const context = useContext(Context);

  const addReplyHandler = (e) => {
    e.preventDefault();
    let input = e.target[0].value;
    let date = new Date();
    const data = {
      id: Math.random(),
      content: input,
      createdAt: new Date() - date,
      score: 0,
      replyingTo: props.replyingTo,
      user: {
        image: {
          png: context.currentUser.image.png,
          webp: context.currentUser.image.webp,
        },
        username: context.currentUser.username,
      },
    };
    context.addReply(data, props.commentId);
    e.target.reset();
    props.closeReplyBox();
  };

  return (
    <form className={classes.form} onSubmit={addReplyHandler}>
      <textarea placeholder="Add a reply..." rows="3"></textarea>
      <div>
        <picture>
          <source srcSet={context.currentUser.image.webp} type="image/webp" />
          <img src={context.currentUser.image.png} alt="avatar" />
        </picture>

        <button className={classes.button}>Reply</button>
      </div>
    </form>
  );
}

export default ReplyForm;
