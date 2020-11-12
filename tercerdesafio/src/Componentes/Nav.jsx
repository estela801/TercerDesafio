import React, { useContext } from "react";
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import { Link } from "@reach/router";
//import { Router, Link } from "@reach/router";
import Empleado from "./Empleado";
import EmpleadoLista from "./EmpleadoLista";
import { UserContext } from "../Provider/UserProvider";
import Principal from "./Principal";
import { auth } from "../Firebase";


const  Nav = () => {

    const signOut = () => {
        auth.signOut();  
      };

    return (    
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">DPS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <Link to="Principal" class="nav-link">Usuario</Link>
          </li>
          <li class="nav-item">
          <Link to="EmpleadoLista" class="nav-link">Empleado</Link>
          </li>
          <li class="nav-item">
          <button className="btn btn-link" onClick={() => { signOut() }}>Cerrar Sesión</button>
          </li>
        </ul>
      </div>
      

    </nav>






       /*
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <ul class="nav navbar-nav">
                <li class="active"><Link to="Principal">Usuario</Link></li>
                <li><Link to="EmpleadoLista"> Empleados</Link></li>
                <li className="nav-item">
                <button type="button" className="btn btn-link" onClick={() => { signOut() }}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          </nav>*/
     
    
    );
  }
  
  
  export default Nav;