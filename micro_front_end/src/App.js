import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import Login from "./components/Login";
import NewUser from "./components/NewUser";
const baseURL = "http://localhost:3003";


// function App() {
//   return (
//    <div>
//      <h2>Hello World</h2>
//    </div>
//   );
// }

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      user_id: "",
      navToggle: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleAddUser(user) {
    console.log(user);
  }
  async handleLogOut() {
    const response = await axios.delete(`${baseURL}/sessions`);
    console.log(response);
    // localStorage.clear();

    this.setState({
     
      loggedIn: false,
      user_id: "",
      navToggle: false
    });
  }
  async handleLogin(user){
    console.log(user.results[0])
    this.setState({
      loggedIn: true,
      user_id: user.results[0].user_id
    })
  }
  render() {

    return(
        <Router>

        <h1>MICROLEARNING APPLICATION</h1>
          <nav>
            <Link to="/NewUser">Create Account</Link>

            {!this.state.loggedIn && ( <Link to="/Login">Log In</Link>)}
            {this.state.loggedIn && (
                  <button
                    
                    onClick={this.handleLogOut}
                  >
                    Log Out
                  </button>
                )}
          </nav>
          

          <Route path="/NewUser" render={props =>(
            <NewUser {...props} handleAddUser={this.handleAddUser}/>
          )}/>



          <Route path="/Login" render={props =>(
            <Login {...props} handleLogin={this.handleLogin}/>
          )}/>

        </Router>
    )
  }

}

// RENDER / RETURN


export default App;
