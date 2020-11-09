import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
      <React.Fragment>
        <Router>
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="/">Usuario</a>
              </div>
              <ul class="nav navbar-nav">
                <li class="active"><Link to="/">Inicio</Link></li>
                <li><Link to="/Empleado">Agregar Empleados</Link></li>
                <li><Link to="/EmpleadoLista">Ver Empleados</Link></li>
                <li className="nav-item">
                <button type="button" className="btn btn-link" onClick={() => { signOut() }}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Principal} />
            <Route exact path="/Empleado" component={Empleado} />
            <Route exact path="/EmpleadoLista" component={EmpleadoLista} />
           
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
  
  
  export default Nav;