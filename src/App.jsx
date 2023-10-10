import { useState } from "react";
import Card from "./Card";
import Deck from "./Deck";

function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Card value="1" show={show} />
      <button onClick={() => setShow(!show)}>Flip</button>
      <Deck />
    </>
  );
}

export default App;
