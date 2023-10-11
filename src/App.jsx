import Deck from "./Deck";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  return (
    <DragDropContext onDragEnd={console.log}>
      <Deck cards={["12", "1", "2"]} deckId="droppable1" />
      <Deck cards={[]} deckId="droppable2" />
    </DragDropContext>
  );
}

export default App;
