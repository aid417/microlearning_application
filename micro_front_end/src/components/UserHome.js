import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
// import Slideshow from "./beginnerspanish/slideshow";
import Card from "./beginnerspanish/flashcard";
import Module from "./Module";
import './user.css';
const baseURL = "http://localhost:3003";


class UserHome extends Component{

    constructor(props){
        super(props);
        this.state={
            user_id:"",
            courses: [],
            course_id: "",
            module_num: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.handleModule = this.handleModule.bind(this);
        this.handleBack = this.handleBack.bind(this);

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
  
        let courses = this.state.course_id;
        const response = await axios.post(`${baseURL}/usercourses`, {
            course_id: this.state.course_id,
           user_id : this.state.user_id
        })

        this.setState({course_id:"", courses: courses})
        // this.props.handleAddUser(response.data);
    }
    handleCourseChange(event) {
        console.log(event.currentTarget.value);
        this.setState({ course_id: event.currentTarget.value });
    }

    handleModule(event){
        event.preventDefault();
        let module_num = parseInt(event.currentTarget.id);
        // console.log(event.currentTarget.id)
        this.setState({
            course_id: 1,
            module_num: module_num
        })
    }
    handleBack(){
        this.setState({
            module_num: ""
        })
        // console.log('hit');
    }

    render(){
        return(
            <Router>
                <div>{this.state.courses.length == 0 &&
                <h2 class="add-h2">ADD A COURSE:</h2>
                
                }

                {!this.state.module_num && (

                    <div>
                        {this.state.courses.length == 0 && 
                <form class="add-class" onSubmit={this.handleSubmit}>
                    <div id="checkbox-div">   <label htmlFor="beginnerspanish">beginner spanish:</label>
                <input type="checkbox" id="beginnerspanish" name="Beginner Spanish" onChange={this.handleCourseChange} value="1"/></div>
                 
                <input id="add-submit" type="submit" value="add course"/>
                    </form>}
                
                {/* {this.state.courses.length > 0 && 
                <div>
                    <Card frontSide = "Hola" backSide = "Hi/Hello"/>
                    <Card frontSide = "Adios" backSide = "Good-Bye" />
                    <Card frontSide = "Por favor" backSide = "Please"/>
                     </div>
                } */}
                {this.state.courses.length > 0 && 
                <div className="user_home"> 
                    

                    <h2 id="spanish">BEGINNER SPANISH</h2>

                    <div id="module-container">
                        <div className="module-div">
                            <h3>module 1</h3>
                            <div> <button className="card-button" id="1" onClick={this.handleModule}>cards</button>  </div>
                           
                        </div>
                        <div className="module-div">
                            <h3>module 2</h3>
                            <div> <button className="card-button" id="2" onClick={this.handleModule}>cards</button>  </div>
                        </div>
                        <div className="module-div">
                            <h3>module 3</h3>
                            <div> <button className="card-button" id="3" onClick={this.handleModule}>cards</button>  </div>
                        </div>
                        <div className="module-div">
                            <h3>module 4</h3>
                            <div> <button className="card-button" id="4" onClick={this.handleModule}>cards</button> 
                            </div>
                        </div>
                        <div className="module-div">
                            <h3>module 5</h3>
                            <div> <button className="card-button" id="5" onClick={this.handleModule}>cards</button>  </div>
                        </div>
                    </div>
                    

                </div>
                
                }

                    </div>


                )}
                
            {this.state.module_num && (
                <Redirect from="/UserHome" to="/Module"/>
            )}
            {this.state.module_num && (
                <Route path="/Module" render={props =>(
                    <Module 
                    {...props} 
                    user_id={this.state.user_id} 
                    course_id={this.state.course_id}
                    module_num={this.state.module_num}
                    handleBack={this.handleBack}
                    />
                )}
                />
            )}
              
             
       </div>
            </Router>
            
        )
    }
}

export default UserHome;