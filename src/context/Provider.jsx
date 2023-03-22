import { useState, useEffect } from "react";

import Context from "./context";

const Provider = (props) => {
  const [commentData, setCommentData] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("data.json");
      const data = await response.json();
      // console.log(data);
      setCommentData(data);
      setCurrentUser(data.currentUser);
    };
    fetchData();
  }, []);

  const addCommentHandler = (comment) => {
    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments.concat(comment),
    };
    setCommentData(newData);
  };

  const addReplyHandler = (data, commentId) => {
    const index = commentData.comments.findIndex(
      (comment) => comment.id === commentId
    );

    const replies = commentData.comments[index].replies.concat(data);

    commentData.comments[index].replies = replies;

    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments,
    };
    setCommentData(newData);
  };

  const deleteCommentHandler = (id) => {
    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments.filter((comment) => comment.id !== id),
    };
    setCommentData(newData);
  };

  const deleteReplyHandler = (commentid, id) => {
    const index = commentData.comments.findIndex(
      (comment) => comment.id === commentid
    );

    const replies = commentData.comments[index].replies.filter(
      (reply) => reply.id !== id
    );

    commentData.comments[index].replies = replies;

    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments,
    };
    setCommentData(newData);
  };

  const context = {
    commentData: commentData,
    currentUser: currentUser,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
    addReply: addReplyHandler,
    deleteReply: deleteReplyHandler,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default Provider;
