import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../Firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {

  state = {user: null};
  componentDidMount = async () => {
    console.log(" UserProvider componentDidMount : ");
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      console.log(" Usuario triggered componentDidMount : " + user);   
      this.setState({ user });      
      console.log("++++++++++++++++++++++++++++++++++");    
    });
  };

  setUserContext = (usertmp) => {  
    this.setState({ usertmp });    
  };

  render() {
    const { user } = this.state;
    console.log(" render -> Usuario UserProvider : " + user);
    return (<UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;