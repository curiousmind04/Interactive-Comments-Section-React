import { useContext } from "react";

import Comments from "./components/Comments";
import Form from "./components/Form";
import Context from "./context/context";

function App() {
  const context = useContext(Context);

  // console.log(context.commentData);

  return (
    <main>
      {context.commentData.comments && (
        <Comments commentData={context.commentData} />
      )}
      <Form />
    </main>
  );
}

export default App;
