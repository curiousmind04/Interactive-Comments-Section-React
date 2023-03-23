import React from "react";

const Context = React.createContext({
  commentData: {},
  currentUser: {},
  addComment: (comment) => {},
  editComment: (input, commentId) => {},
  editCommentScore: (score, commentId) => {},
  deleteComment: (commentId, id) => {},
  addReply: (data, commentId) => {},
  editReply: (input, commentId, replyId) => {},
  editReplyScore: (score, commentId, replyId) => {},
  deleteReply: (id) => {},
});

export default Context;
