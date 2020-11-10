import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Provider/UserProvider";
import { auth } from "../Firebase";
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
  

  <div class="container" style={{ marginTop: "8%"}}>
 
  <>    
  <div className="col-md-4 p-2">
        <h2>AGREGAR/ACTUALIZAR EMPLEADOS</h2>
        <p>*Seleccione un empleado para actualizar la información* </p>
        <Empleado {...{ addOrEditEmpleado, currentId, Empleado }} />
      </div>

   

      <div className="col-md-8 p-2">
        <div class="container">
          <h2>Lista Empleados</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Horas Trabajadas</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                   <td>{Empleado.codigo}</td>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.horas}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
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
  
  