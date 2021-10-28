import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
// import Slideshow from "./beginnerspanish/slideshow";
import Card from "./beginnerspanish/flashcard";
import UserHome from "./UserHome";
const baseURL = "http://localhost:3003";



class Module extends Component{

    constructor(props){
        super(props);
        this.state={
            cards: []
        }
        
    }
async componentDidMount(){
    console.log(this.props, 'props')
    const response = await axios.get(`${baseURL}/modules/${this.props.module_num}`);
    console.log(response.data.results)
}


    render(){
        return(
            <div>
                <p>hello</p>
                <button onClick={this.props.handleBack}><Link to="/UserHome" >back</Link></button>

        
            </div>

          
        )
    }

}



export default Module;