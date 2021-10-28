import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import Slideshow from "./Slideshow";
import Card from "./beginnerspanish/flashcard";
import UserHome from "./UserHome";
import './user.css';
// import defaultSlides from "./defaultSlides";
import './slideshow.css';
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
    this.setState({
        cards: response.data.results
    })
    
}


    render(){
        return(
            <div id="module-main">
    
                <button id="back" onClick={this.props.handleBack}><Link to="/UserHome" >back to home</Link></button>

                <Slideshow slides={this.state.cards} />
            </div>

          
        )
    }

}



export default Module;