import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
const baseURL = "http://localhost:3003";


class UserHome extends Component{

    constructor(props){
        super(props);
        this.state={
            user_id:"",
            courses: [],
            course_id: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this)
    }
    async componentDidMount() {
        const response = await axios.get(`${baseURL}/usercourses/${this.props.userid}`);
        // console.log(response.data.results)
       this.setState({
           user_id : this.props.userid,
           courses : response.data.results
       })
      }

    async handleSubmit(event){
        event.preventDefault();
  
      
        const response = await axios.post(`${baseURL}/usercourses`, {
            course_id: this.state.course_id,
           user_id : this.state.user_id
        })

        this.setState({course_id:""});
        console.log(response)
        // this.props.handleAddUser(response.data);
    }
    handleCourseChange(event) {
        console.log(event.currentTarget.value);
        this.setState({ course_id: event.currentTarget.value });
    }

    render(){
        return(
            <div>{this.state.courses.length == 0 &&
                <p>You are not enrolled in any courses</p>
                
                }
                {this.state.courses.length == 0 && 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="beginnerspanish">Beginner Spanish:</label>
                <input type="checkbox" id="beginnerspanish" name="Beginner Spanish" onChange={this.handleCourseChange} value="1"/>
                <input type="submit" value="Submit"/>
                    </form>}
                
                </div>
            
            // <div> 
            //     <p>These are your classes</p>
            // </div>
        )
    }
}


export default UserHome;