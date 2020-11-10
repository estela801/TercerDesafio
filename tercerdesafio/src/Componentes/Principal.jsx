import React, { useContext } from "react";
import { UserContext } from "../Provider/UserProvider";
import { auth } from "../Firebase";
import { Router, Link } from "@reach/router";

const Principal = () => {


    const user = useContext(UserContext);
  
    const { photoURL, displayName, email } = user;
    console.log(" Empleadx : " + displayName + " - " + email);
  
    const signOut = () => {
      auth.signOut();  
    };
  
    return (
      <div>
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
                     <a class="nav-link" href="#">Features</a>
                 </li>
                 <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                <button type="button" class="btn btn-link" onClick={() => { signOut() }}>Cerrar Sesión</button>
                </li>
            </ul>
       </div>
        </nav>
  <br></br>
        <div class="container">
          <div className="row">
            <div className="col-md-12">
              <span className="float-right">
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
  
  