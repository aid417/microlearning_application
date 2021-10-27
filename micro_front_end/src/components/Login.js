import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3003";

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    }

    async handleSubmit(event) {
        // console.log("hitting submit route");
        event.preventDefault();
    
        const response = await axios.post(`${baseURL}/sessions`, {
          username: this.state.username,
          password: this.state.password
        });
    
        this.setState({ username: "", password: "" });
        this.props.handleLogin(response.data);
      }
      handleUserNameChange(event) {
        this.setState({ username: event.currentTarget.value });
      }
      handlePasswordChange(event) {
        this.setState({ password: event.currentTarget.value });
      }
render(){
    return(

        <div>
                <form onSubmit={this.handleSubmit}>
                    
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" name="username" placeholder = "username" onChange={this.handleUserNameChange}     value={this.state.username}/>
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" name="password" placeholder = "password" onChange={this.handlePasswordChange}
            value={this.state.password}/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
    )
}

}





export default Login;