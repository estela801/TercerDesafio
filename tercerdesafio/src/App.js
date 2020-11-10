import './App.css';
import Popper from 'popper.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Application from "./Componentes/Inicio";
import UserProvider from "./Provider/UserProvider";
import Inicio from './Componentes/Inicio';


function App() {
  return (
   
    <UserProvider>
     <Inicio/>

    </UserProvider>
  );
}

export default App;
