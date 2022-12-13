import React, { useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import List from "./List";
import CardForm from "./CardForm"
import { list } from "postcss";



function Board() {
    
const [newProjectInput, setNewProjectInput] = useState({});
const [projectList, setProjectList] = useState([]);
const [lists, setLists] = useState(lists)
useEffect(() => {
    onSnapshot(collection(db, "project"), (snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
            if(docChange.type === "added") {
                setProjectList((preProjectList) => [
                     ...preProjectList,
                    docChange.doc.data()
                ]);
            } else if (docChange.type === "removed") {
                setProjectList(
                    projectList.filter((project) => project.id !== docChange.doc.id)
                )
            }
        })
    })
}, []);


const handleOnChange = (event) => {
    const keyName = event.target.name;
    const value = event.target.value;
    setProjectList((prev) => {

        return { ...prev, [keyName]: value }
    })
}

const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "project"), {
        ...projectList
    })
    setProjectList({
title: "",
tasks: []
    })
}

const handleDeleteProject = async (id) => {
    await deleteDoc(doc(db, "project", id));

    const newProject = newProjectInput.filter((project) => project.projectid !== id);
    setProjectList(newProject)
}
return (
    <div>
        <CardForm
        onSubmit={handleSubmit}
        onChange={handleOnChange}
        projectList={newProject}
        />
        <DragDropContext>
            <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => {
                    <div ref={provided.innerRef}>
                        {list.map((list, index) => {
                            return <List list={list} key={list.id} index={index}/>
                        })}
                        {provided.placeholder}
                        <div>
                            <CardForm type="list"/>
                        </div>
                    </div>
                }}
            </Droppable>
        </DragDropContext>
        
    </div>
)
}



 export default Board;