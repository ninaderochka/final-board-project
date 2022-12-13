import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CardForm from "./CardForm";
import { addCard } from "../Redux/";
import { useDispatch } from "react-redux";

function List({ id, title, cards }) {
  const dispatch = useDispatch();
  const cardsArr = cards.map((card) => (
    <CardForm key={card.id} listId={id} cardId={card.id} type="card" />
  ));

  return (
    <div>
      <CardForm listId={id} type="list" />
      {cardsArr}
    </div>
  );
}

export default List;

// return (
//         <Draggable draggableId={list.id} index={index}>
// {
//     (provided) => (
//         <div {...provided.draggableProps} ref={provided.innerRef}>
//             <div>
//             List Title
//              </div>
//              <div>
//                 <Droppable droppableId={list.id} type="task">
//                 {
//      (provided) => (
//         <div {...provided.droppableProps} ref={provided.innerRef}>
//             {list.cards.map((card, index) => {
//                 return <h1>Card</h1>
//             })

//             }
//             {provided.placeholder}
//         </div>
//                )}
//                 </Droppable>
//              </div>
//              <CardForm listId={list.id} type="card"/>
//         </div>
//     )
// }
//         </Draggable>
//     )
