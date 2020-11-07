import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../Firebase";
import { auth } from "../Firebase";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const signInWithEmailAndPasswordHandler = (event) => {

    event.preventDefault(); //DOM -> POST , GET -> PHP , JAVA , ASP , ETC
   
    console.log(" SignIn - signInWithEmailAndPasswordHandler ");
    const user= auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error, por favor revisar credenciales -> " + error);
        console.error("Error signing in with password and email ", error);
      });
      console.log(" SignIn - signInWithEmailAndPassword ");  
      console.log(" const user :  " + user);      
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };


  return (
    <div className="">
      <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
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
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
<br></br>
<div class="row">

<div class="col-4 "  style={{margin:'auto'}}>

 <div class="card card-primary">
      <div class="card-header text-white bg-secondary">
        <h3 class="card-title">Iniciar Sesión </h3></div>
        <form  >
               {error !== null && (

         <div class="alert alert-danger" role="alert">
                {error}
               </div>
            )}
        <div class="card-body">
       <div class="form-group">
     <label for="exampleInputPassword1">Correo Electronico</label>
     <input type="email" class="form-control" name="userEmail" placeholder="Ingresar Correo Electronico"
     id="exampleInputPassword1" onChange={(event) => onChangeHandler(event)} />
    </div>
    <div class="form-group">
     <label for="exampleInputPassword1">Contraseña</label>
     <input type="password" class="form-control" name="userPassword" placeholder="Ingresar Contraseña"
     id="exampleInputPassword1" onChange={(event) => onChangeHandler(event)} />
    </div>

<button type="submit" class="btn btn-dark" 
onClick={(event)=> {signInWithEmailAndPasswordHandler(event)}}><i className="fa fa-lock">
  </i>Ingresar</button>
  </div>
</form>
<br />
<button class="btn btn-info "
            onClick={() => { signInWithGoogle(); }}> Ingresar con Google</button> 
            

          <p> {""}
<Link to="SignUp"> Registrese Aquí </Link></p>
   
</div>
</div>
</div>

       
        </div>   
    
  );
};

export default Login;
