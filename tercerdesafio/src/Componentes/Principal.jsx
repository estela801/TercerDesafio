import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Provider/UserProvider";
import { auth } from "../Firebase";
import { Router, Link } from "@reach/router";
import { firestore } from "../Firebase";
import { toast } from "react-toastify";
import  Empleado  from "./Empleado";
import inicio from "./Inicio";
import Nav from "./Nav";
const Principal = () => {


    const user = useContext(UserContext);
  
    const { photoURL, displayName, email } = user;
    console.log(" Empleadx : " + displayName + " - " + email);
   
    return (
      <div>
           <Nav/>
  
  <div class="container" style={{ marginTop: "8%"}}>
  <h1>BIENVENIDO/A</h1>
   
          <div className="row float-right" >
            <div className="col-md-12" >
              <span className="float-center">
               <h1>DATOS DEL USUARIO</h1>
               <br></br>
                <div
                  style={{
                    background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px"
                  }}
                  className="border border-blue-300"
                ></div>
                <br></br>
               Nombre : <h2 className="text-2xl font-semibold">{displayName}</h2>
                <br></br>
               
              </span>
            </div>
          </div>
        </div>
            </div>
    )
  };
  
  export default Principal;
  
  