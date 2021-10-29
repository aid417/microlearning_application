import React, { Component } from "react";
import axios from "axios";
import '../main.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
const baseURL = "http://localhost:3003";

class NewUser extends Component{
    constructor(props){
        super(props);

        this.state ={
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }
    handleUserNameChange(event) {
        this.setState({ username: event.currentTarget.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.currentTarget.value });
    }
    handleFirstNameChange(event) {
        this.setState({ first_name: event.currentTarget.value });
    }
    handleLastNameChange(event) {
        this.setState({ last_name: event.currentTarget.value });
    }
    async handleSubmit(event){
        event.preventDefault();

        const response = await axios.post(`${baseURL}/users`, {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        })

        this.setState({username: "", password: "", first_name:"", last_name:""});
        this.setState({
            redirect: true
        })
        this.props.handleAddUser(response.data);
    }

    render(){
        return (
            <Router>
                {this.state.redirect &&(
                    <Redirect from="/NewUser" to="/Home"/>
                )}

                {!this.state.redirect &&(
                    <div id="login">
                    <form class="main-form" onSubmit={this.handleSubmit}>
                        {/* <label htmlFor="firstname">First Name:</label> */}
                        <input type="text" id="firstname" name="firstname" placeholder = "first name" onChange={this.handleFirstNameChange}     value={this.state.first_name}/>
                        {/* <label htmlFor="lastname">Last Name:</label> */}
                        <input type="text" id="lastname" name="lastname" placeholder = "last name" onChange={this.handleLastNameChange}     value={this.state.last_name}/>
                        {/* <label htmlFor="username">User Name:</label> */}
                        <input type="text" id="username" name="username" placeholder = "username" onChange={this.handleUserNameChange}     value={this.state.username}/>
                        {/* <label htmlFor="password">Password:</label> */}
                        <input type="text" id="password" name="password" placeholder = "password" onChange={this.handlePasswordChange}
                value={this.state.password}/>
                         <input id="login-button" type="submit" value="register"/>
                    </form>
                </div>
                )}
                
            </Router>
            
        )
    }

}



export default NewUser;