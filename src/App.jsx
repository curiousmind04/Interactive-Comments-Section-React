import { useContext } from "react";

import Comments from "./components/Comments";
import Form from "./components/Form";
import Context from "./context/context";

function App() {
  const context = useContext(Context);

  return (
    <main>
      <Comments commentData={context.commentData} />
      <Form />
    </main>
  );
}

export default App;
