import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTitle,
  addCard,
  editCard,
  addList,
  deleteList,
  deleteCard,
} from "../Redux/reducer";

const CardForm = ({ listId, cardId, type }) => {
  const dispatch = useDispatch();
  // dispatchEvent((changeTitle(id,title)))
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const addButtonHandler = () => {
    type === "card" ? dispatch(addCard(listId)) : dispatch(addList());
  };
  const deleteButtonHandler = () => {
    type === "card"
      ? dispatch(deleteCard(listId, cardId))
      : dispatch(deleteList(listId));
  };
  const handleBlur = (text) => {
    type === "card"
      ? dispatch(editCard(listId, cardId, text))
      : dispatch(changeTitle(listId, text));
  };

  const buttonClass =
    "inline-block px-6 py-2.5 bg-emerald-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-400 hover:shadow-lg focus:bg-emerald-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-400 active:shadow-lg transition duration-150 ease-in-out";

  return (
    <div id={type === "card" ? cardId : listId}>
      <div>
        <input
          value={title}
          onChange={handleChange}
          placeholder={
            type === "card"
              ? "Enter a title for this card..."
              : "Enter list title"
          }
          autoFocus
          onBlur={(e) => {
            handleBlur(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={addButtonHandler}>
          {type === "card" ? "Add a card" : "Add another list"}
        </button>
        <button type="button" onClick={deleteButtonHandler}>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardForm;
