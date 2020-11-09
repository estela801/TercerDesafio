import React, { useContext } from "react";
import { Router } from "@reach/router";
import Empleado from "./Empleado";
import EmpleadoLista from "./EmpleadoLista";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserContext } from "../Provider/UserProvider";
import Principal from "./Principal";

function Inicio()
{

    const user = useContext(UserContext);
    console.log(" Usuario Application : " + user);
    return (
        user ? <EmpleadoLista/>  // true
          : // false
          <Router> 
              <Login path="/" />
              <SignUp path="SignUp" />
              <Principal path="Principal" />
              <Empleado path="Empleado" />
              <EmpleadoLista path="EmpleadoLista" />
             
             
          </Router>
      );
    
    
};
export default Inicio;