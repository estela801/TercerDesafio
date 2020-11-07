import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../Firebase";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event) => {

    event.preventDefault(); 

    setError("");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
    }
    catch (error) {
      setError('Error , Por favor intentar de nuevo : ' + error);
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
<br></br>
<div className="row">

<div className="col-4" style={{margin:'auto'}}>

 <div className="card " >
      <div className="card-header text-white bg-secondary">
        <h4 className="card-title">Registro </h4></div>
        <div className="card-body">
        {error !== null && (

<div class="alert alert-danger" role="alert">
       {error}
      </div>
   )}
        <form  >
              
            
       <div className="form-group">
     <label for="exampleInputPassword1">Nombre</label>
     <input type="text" class="form-control" name="displayName" placeholder="Ingresar Nombre" id="exampleInputPassword1" onChange={(event) => onChangeHandler(event)} />
    </div>
      
       <div className="form-group">
     <label for="exampleInputPassword1">Correo Electronico</label>
     <input type="email" class="form-control" name="userEmail" placeholder="Ingresar Correo Electronico" value={email} id="userEmail" onChange={(event) => onChangeHandler(event)} />
    </div>
    <div className="form-group">
     <label for="exampleInputPassword1">Contraseña</label>
     <input type="password" class="form-control" name="userPassword" value={password} placeholder="Ingresar Contraseña"id="userPassword" onChange={(event) => onChangeHandler(event)} />
    </div>
    <button  className="btn btn-dark" onClick={(event)=> {createUserWithEmailAndPasswordHandler(event)}}><i className="fa fa-lock"></i>Registrar</button>
    </form>
   
    <p> {""}
<Link to="/">O inicie sesión aquí </Link>{""}</p>
</div> 
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
