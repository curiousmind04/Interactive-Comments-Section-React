import React from "react";

const Context = React.createContext({
  commentData: {},
  currentUser: {},
  addComment: (comment) => {},
  deleteComment: (commentId, id) => {},
  addReply: (data, commentId) => {},
  deleteReply: (id) => {},
});

export default Context;
