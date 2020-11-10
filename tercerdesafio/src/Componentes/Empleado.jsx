import React, { useContext, useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import { UserContext } from "../Provider/UserProvider";
import { firestore } from "../Firebase";
import { toast } from "react-toastify";


const Empleado = (props) => {


const initialStateValues = {
    codigo: "",
    nombre: "",
    horas: "0",
    sueldob:0,
    isss:0,
    afp:0,
    renta:0,
    sueldol:0,
    sueldon:0,
   };
    
  
   const [values, setValues] = useState(initialStateValues);

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setValues({ ...values, [name]: value });
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
      if(values.horas<=160)
      {
        values.sueldob = values.horas*9.75; 
        values.isss = values.sueldob * 0.0525;
        values.afp = values.sueldob * 0.0688;
        values.renta = values.sueldob * 0.1;
        values.sueldol = values.sueldob - values.renta - values.afp - values. isss;
   
      }
    
      else if (values.horas>160 && values.horas<=200)
      { 
        values.sueldob = (160 * 9.75) + ((values.horas - 160)*11.50);
        values.isss = values.sueldob * 0.0525;
        values.afp = values.sueldob * 0.0688;
        values.renta = values.sueldob * 0.1;
        values.sueldol = values.sueldob - values.renta - values.afp - values. isss;
       

      }

      else if (values.horas>200 && values.horas<=250)
      {
        values.sueldob = (160*9.75) + (39*11.50) + ((values.horas-200)*12.50)
        values.isss = values.sueldob * 0.0525;
        values.afp = values.sueldob * 0.0688;
        values.renta = values.sueldob * 0.1;
        values.sueldol = values.sueldob - values.renta - values.afp - values. isss;
 

      }
      else 
      {
        values.sueldob = values.horas*12.50; 
        values.isss = values.sueldob * 0.0525;
        values.afp = values.sueldob * 0.0688;
        values.renta = values.sueldob * 0.1;
        values.sueldol = values.sueldob - values.renta - values.afp - values. isss;
        
      }
     
     props.addOrEditEmpleado(values);
     setValues({ ...initialStateValues });
   };
 
   const getEmpleadoById = async (id) => {
     const doc = await firestore.collection("empleados").doc(id).get();
     setValues({ ...doc.data() });
   };
 
   useEffect(() => {
     if (props.currentId === "") {
       setValues({ ...initialStateValues });
     } else {
   
       if (props.currentId !== null && props.currentId !== undefined) {
         getEmpleadoById(props.currentId);
       }
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props.currentId]);

    
   return (
    <form onSubmit={handleSubmit} className="card card-body border-primary  col-6">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">codigo</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el código del trabajador"
          value={values.codigo}
          name="codigo"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">Nombre</i>
        </div>
        <input
         type="text"
         className="form-control"
         placeholder="Ingrese el nombre del trabajador"
         value={values.nombre}
         name="nombre"
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
         placeholder="Ingrese las horas trabajadas"
         className="form-control"
         onChange={handleInputChange}

        />

      </div>
      <button className="btn btn-info btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
};

export default Empleado;






