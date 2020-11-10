import React, { useContext } from "react";
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import { Link } from "@reach/router";
import Empleado from "./Empleado";
import EmpleadoLista from "./EmpleadoLista";
import { UserContext } from "../Provider/UserProvider";
import Principal from "./Principal";
import { auth } from "../Firebase";

function Nav() {
    const signOut = () => {
        auth.signOut();  
      };

    return (    
    
        <Router>
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <ul class="nav navbar-nav">
                <li class="active"><Link to="Principal">Inicio</Link></li>
                <li><Link to="Empleado">Agregar Empleados</Link></li>
                <li><Link to="EmpleadoLista">Ver Empleados</Link></li>
                <li className="nav-item">
                <button type="button" className="btn btn-link" onClick={() => { signOut() }}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          </nav>
          
        </Router>
    
    );
  }
  
  
  export default Nav;