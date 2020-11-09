import React, { useContext, useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import { UserContext } from "../Provider/UserProvider";
import { auth } from "../Firebase";
import { firestore } from "../Firebase";
import { toast } from "react-toastify";
import inicio from "./Inicio";
import Nav from "./Nav";

const Empleado = (props) => {
   //salir
   
   const signOut = () => {
    auth.signOut();  
  };
const initialStateValues = {
    codigo: "",
    nombre: "",
    horas: 0,
    sueldob: 0,
    sueldol:0,
    sueldon:0,
    isss:0,
    afp:0,
    renta:0,
   };
     const [values, setValues]= useState(initialStateValues);  
   
   const handleInputChange = (e) => {
     const {name, value} = e.target;
     setValues({...values, [name]:value });
   };
   const handleSubmit = (e) => {
     e.preventDefault();
    
     props.addorEditEmpleado(values);
     setValues({...initialStateValues});
   };
   
   const getEmpleadoById = async (id) => {
     const doc = await firestore.collection("empleados").doc(id).get();
     setValues({...doc.data() });
   };
   
   useEffect(() => {
     if (props.currentId === ""){
       setValues({...initialStateValues });
     } else {
       if (props.currentId !== null && props.currentId !== undefined) {
         getEmpleadoById(props.currentId);
       }
     }
   }, [props.currentId]);
   
    
  return (
<div>    <Nav/>
   
    <div className="contain float-center">
    
    <br></br>
      <span className="float-center">
<h1 style={{textAlign:"center"}}>AGREGAR EMPLEADOS</h1>

      <br></br>
<form onSubmit={handleSubmit} className="card card-body border-primary col-md-6">
<div className="form-group input-group">
<div className="input-group-text bg-light">
  <i className="material-icons">Código</i>
</div>        
<input
  type="text"
  className="form-control"
  placeholder="Ingrese codigo del empleado"
  value={values.codigo}
  name="codigo"
  onChange={handleInputChange}
/>
</div>
<div className="form-group input-group">
<div className="input-group-text bg-light">
  <i className="material-icons">Nombre </i>
</div>
<input
  type="text"
  value={values.nombre}
  name="nombre"
  placeholder="Ingrese el nommbre del empleado"
  className="form-control"
  onChange={handleInputChange}
/>
</div>
<div className="form-group input-group">
<div className="input-group-text bg-light">
  <i className="material-icons">Horas</i>
</div>
<input
  type="number"
  value={values.horas}
  name="horas"
  onChange={handleInputChange}
  placeholder="Ingrese cantidad de horas trabajadas"
  className="form-control"
 
/>
</div>
<button className="btn btn-primary btn-block">
{props.currentId === "" ? "Guardar" : "Actualizar"}
</button>
</form>
</span>
</div>
</div>


  );
};

export default Empleado;






