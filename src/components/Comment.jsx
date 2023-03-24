import { useContext, useState } from "react";

import Replies from "./Replies";
import ReplyForm from "./ReplyForm";
import Modal from "./Modal";
import Context from "../context/context";

import classes from "./Comment.module.css";

function Comment(props) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const context = useContext(Context);

  const openModalHandler = () => {
    setEditing(false);
    setDeleting(true);
  };

  const closeModal = () => {
    setDeleting(false);
  };

  const onDelete = () => {
    context.deleteComment(props.id);
    setDeleting(false);
  };

  const openReplyBox = () => {
    setReplying((prev) => !prev);
  };

  const closeReplyBox = () => {
    setReplying(false);
  };

  const editingStateHandler = () => {
    setEditing((prev) => !prev);
  };

  const editCommentHandler = (e) => {
    e.preventDefault();
    let input = e.target[0].value;
    context.editComment(input, props.id);
    setEditing(false);
  };

  let score;

  const editCommentScoreHandler = (e) => {
    score = props.score;
    if (e.target.id === "increase") {
      score = parseInt(score) + 1;
    } else if (e.target.id === "decrease" && score > 0) {
      score = score - 1;
    } else {
      return;
    }
    context.editCommentScore(score, props.id);
  };

  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
    style: "narrow",
  });

  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  function formatTimeAgo(date) {
    let duration;

    if (typeof date === "string") {
      duration = (new Date(date) - new Date()) / 1000;
    } else {
      duration = (date - new Date()) / 1000;
    }

    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  }

  return (
    <>
      <div className={classes.container}>
        <div>
          <div className={classes.top}>
            <div>
              <picture>
                <source srcSet={props.user.image.webp} type="image/webp" />
                <img src={props.user.image.png} alt="avatar" />
              </picture>
              <div className={classes.username}>
                {props.user.username}
                {context.currentUser.username === props.user.username && (
                  <div className={classes.badge}>
                    <p>you</p>
                  </div>
                )}
              </div>
            </div>

            <span className={classes.date}>
              {formatTimeAgo(props.createdAt)}
            </span>
          </div>
          {!editing && <p className={classes.content}>{props.content}</p>}
          {editing && (
            <form className={classes.form} onSubmit={editCommentHandler}>
              <textarea rows="3" defaultValue={props.content}></textarea>
              <button className={classes.button}>Update</button>
            </form>
          )}
        </div>

        <div className={classes.bottom}>
          <div className={classes.scoreChanger}>
            <div onClick={editCommentScoreHandler} id="increase">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
            <p>{props.score}</p>
            <div onClick={editCommentScoreHandler} id="decrease">
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="#C5C6EF"
                />
              </svg>
            </div>
          </div>
          {context.currentUser.username !== props.user.username && (
            <button className={classes.reply} onClick={openReplyBox}>
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6"
                />
              </svg>
              <span>Reply</span>
            </button>
          )}
          {context.currentUser.username === props.user.username && (
            <div className={classes.actions}>
              <button className={classes.delete} onClick={openModalHandler}>
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>
                <span>Delete</span>
              </button>
              <button className={classes.edit} onClick={editingStateHandler}>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {replying && (
        <ReplyForm
          replyingTo={props.user.username}
          commentId={props.id}
          closeReplyBox={closeReplyBox}
        />
      )}
      {deleting && <Modal closeModal={closeModal} onDelete={onDelete} />}
      {props.replies.length > 0 && (
        <div className={classes.replies}>
          <div className={classes.line}></div>
          <Replies commentId={props.id} replies={props.replies} />
        </div>
      )}
    </>
  );
}

export default Comment;
