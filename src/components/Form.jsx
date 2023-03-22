import { useContext } from "react";

import Context from "../context/context";
import classes from "./Form.module.css";

function Form(props) {
  const context = useContext(Context);

  const addCommentHandler = (e) => {
    e.preventDefault();
    let input = e.target[0].value;
    let date = new Date();
    context.addComment({
      id: Math.random(),
      content: input,
      createdAt: new Date() - date,
      score: 0,
      user: {
        image: {
          png: context.currentUser.image.png,
          webp: context.currentUser.image.webp,
        },
        username: context.currentUser.username,
      },
      replies: [],
    });
    e.target.reset();
  };

  return (
    <form className={classes.form} onSubmit={addCommentHandler}>
      <textarea placeholder="Add a comment..." rows="3"></textarea>
      <div>
        {context.currentUser && (
          <picture>
            <source srcSet={context.currentUser.image.webp} type="image/webp" />
            <img src={context.currentUser.image.png} alt="avatar" />
          </picture>
        )}
        <button className={classes.button}>Send</button>
      </div>
    </form>
  );
}

export default Form;
