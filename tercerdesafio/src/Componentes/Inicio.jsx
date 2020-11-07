import React, { useContext } from "react";
import { Router } from "@reach/router";

import Login from "./Login";
import SignUp from "./SignUp";
import { UserContext } from "../Provider/UserProvider";
import Principal from "./Principal";

function Inicio()
{

    const user = useContext(UserContext);
    console.log(" Usuario Application : " + user);
    return (
        user ? <Principal />  // true
          : // false
          <Router> 
              <Login path="/" />
              <SignUp path="SignUp" />
                
          </Router>
      );
    
    
};
export default Inicio;