import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Provider/UserProvider";
import { Router, Link } from "@reach/router";
import { firestore } from "../Firebase";
import { toast } from "react-toastify";
import inicio from "./Inicio";
import Empleado from "./Empleado";
import Nav from "./Nav";

const EmpleadoLista= () => {


  //Codigo infor empleados
  const[Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");
  var maxi = 0;
  var EmpleadoM = {
    nombre: "",
    salario: "",
    m : "mayor"
  };
  var EmpleadoP = {
    nombre: "",
    salario: "",
    m : "mayor"
  }

  const getEmpleados = async () => {
      firestore.collection("empleados").onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) =>{
              docs.push({ ...doc.data(), id: doc.id});
          });
          setEmpleados(docs);
      });
      };

  const onDeleteEmpleado = async (id) => {
      if (window.confirm("¿Estás seguro que deseas eliminar este empleado?")) {
          await firestore.collection("empleados").doc(id).delete();
          toast("Se eliminó un Empleado", {
              type: "success",
          });
      }
  };

  useEffect(() => {
      getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
      //this.salarion=this.horas*9.75;
      
   
      try {
          if (currentId === "") {
            
              await firestore.collection("empleados").doc().set(EmpleadoObject);
              toast("Se agregó un nuevo Empleado",{
                  type: "success",
              });
          } else {
              await firestore.collection("empleados").doc(currentId).update(EmpleadoObject);
      toast("Se actualizó un Empleado", {
        type: "info",
      });
      setCurrentId("");
          }
      } catch (error) {
          console.error(error);
      }
  };



    return (
      <div>
         <Nav/>
  

  <div class="container" style={{ marginTop: "6%"}}>
 
  <>    
  <div className=" float-right">
        <h2 style={{ textAlign:"right" }}>AGREGAR/ACTUALIZAR EMPLEADOS</h2>
        <p style={{ textAlign:"right" }}>*Seleccione un empleado para actualizar la información* </p>
        <Empleado {...{ addOrEditEmpleado, currentId, Empleado }} />
      </div>
      <div style={{ float : "left"}}>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Salario</th>
              <th>Ganancia</th>
            </tr>
          </thead>
          <tbody>
           <tr>
             { Empleados.map((emp)=> {
              if(maxi < emp.sueldob){
                EmpleadoM.nombre = emp.nombre;
                EmpleadoM.salario = emp.sueldob;
                maxi = emp.sueldob; 
                }
             })}
             <td>{EmpleadoM.nombre}</td>
             <td>{EmpleadoM.salario}</td>
             <td>{EmpleadoM.m}</td>
           </tr>
           <tr>

           </tr>
          </tbody>
        </table>
      </div>
   <br></br>
   <br></br>
      <div className="float-center">
        <div class="container">
          <h2 style={{ textAlign:"center" , marginTop: "30%"}}>LISTA  DE EMPLEADOS</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Horas Trabajadas</th>
                <th>Sueldo Base</th>
                <th>ISSS</th>
                <th>AFP</th>
                <th>Renta</th>
                <th>Sueldo Neto</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                   <td>{Empleado.codigo}</td>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.horas}</td>
                  <td>{Empleado.sueldob}</td>
                  <td>{Empleado.isss}</td>
                  <td>{Empleado.afp}</td>
                  <td>{Empleado.renta}</td>
                  <td>{Empleado.sueldol}</td>

                  
                  <td>
                    <button className="btn btn-info" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
   
        </div>
            </div>
    )
  };
  
  export default EmpleadoLista;
  
  