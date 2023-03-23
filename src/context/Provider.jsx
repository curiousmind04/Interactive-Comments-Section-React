import { useState, useEffect } from "react";

import Context from "./context";

const Provider = (props) => {
  const [commentData, setCommentData] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("data.json");
      const data = await response.json();
      sortComments(data);
      //   setCommentData(data);
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

  const editCommentHandler = (input, commentId) => {
    const index = commentData.comments.findIndex(
      (comment) => comment.id === commentId
    );

    commentData.comments[index].content = input;

    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments,
    };
    setCommentData(newData);
  };

  const editReplyHandler = (input, commentId, replyId) => {
    const commentIndex = commentData.comments.findIndex(
      (comment) => comment.id === commentId
    );

    const replyIndex = commentData.comments[commentIndex].replies.findIndex(
      (reply) => reply.id === replyId
    );

    commentData.comments[commentIndex].replies[replyIndex].content = input;

    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments,
    };
    setCommentData(newData);
  };

  const editCommentScoreHandler = (score, commentId) => {
    const index = commentData.comments.findIndex(
      (comment) => comment.id === commentId
    );

    commentData.comments[index].score = score;

    const newData = {
      currentUser: commentData.currentUser,
      comments: commentData.comments,
    };
    // setCommentData(newData);
    sortComments(newData);
  };

  const editReplyScoreHandler = (score, commentId, replyId) => {
    const commentIndex = commentData.comments.findIndex(
      (comment) => comment.id === commentId
    );

    const replyIndex = commentData.comments[commentIndex].replies.findIndex(
      (reply) => reply.id === replyId
    );

    commentData.comments[commentIndex].replies[replyIndex].score = score;

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

  const sortComments = (data) => {
    let arr = [...data.comments];
    let byScoreDecreasing = arr.slice(0);
    byScoreDecreasing.sort(function (a, b) {
      return b.score - a.score;
    });
    data.comments = [...byScoreDecreasing];
    const newData = {
      currentUser: data.currentUser,
      comments: data.comments,
    };
    setCommentData(newData);
  };

  const context = {
    commentData: commentData,
    currentUser: currentUser,
    addComment: addCommentHandler,
    editComment: editCommentHandler,
    editCommentScore: editCommentScoreHandler,
    deleteComment: deleteCommentHandler,
    addReply: addReplyHandler,
    editReply: editReplyHandler,
    editReplyScore: editReplyScoreHandler,
    deleteReply: deleteReplyHandler,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default Provider;
