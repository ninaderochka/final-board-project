import React from "react";
import {Routes,Route,Link} from "react-router-dom";
import Home from "./Home"
import InProject from "./InProject.js"
import { collection, addDoc, onSnapShot } from "firebase/firestore";
import db from "../firebase";
import "../styles/App.css";

function App(){
useEffect(()=>{
    const snapshot = onSnapShot(collection(db, "users"))
    console.log(snapshot);
})
return ( <div>
<Routes>
<Route path="/home" element={<Home />}/>
<Route path="/Inproject" element={<InProject />}/>
</Routes>
</div>
)}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;