import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import List from "./Components/List";
import "./styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "./Redux/reducer";

function App(props) {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const listsArray = lists.map((list) => {
    return <List key={list.id} {...list} />;
  });
  console.log(lists);
  return (
    <div>
      <div className="w-72 m-5 p-2 rounded bg-slate-100">
        {lists && listsArray}
      </div>
    </div>
  );
}

export default App;
