import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import UserHome from "./components/UserHome";
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import Home from "./components/Home";



const baseURL = "http://localhost:3003";



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      user_id: "",
      navToggle: false,
      user_courses:[]
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    // this.getCourses = this.getCourses.bind(this);
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
    const response = await axios.get(`${baseURL}/usercourses/${user.results[0]}`);
    this.setState({
      loggedIn: true,
      user_id: user.results[0].user_id,
      navToggle: false,
      user_courses: response.data.results
    })
  }

  // async getCourses(user){
  //   const response = await axios.get(`${baseURL}/usercourses/${user}`);
  //   console.log(response.data.results);
  // }
  render() {

    return(
        <Router>
        
        <h1>
          <Link to="/Home">STUDY BUDDY </Link>
          </h1>
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


          <Route path="/Home" exact component={Home} />

          {this.state.loggedIn ? (
            <Redirect from="/Login" to="/UserHome" />

          ): (
            <Route path="/Login" render={props =>(
              <Login {...props} handleLogin={this.handleLogin}/>
            )}/>
          )}
          {this.state.loggedIn && (
            <Route path="/UserHome" render={props => (
              <UserHome {...props} userid={this.state.user_id} courses={this.state.user_courses}/>
            )

            }
            />
          )}

        </Router>
    )
  }

}

// RENDER / RETURN


export default App;
