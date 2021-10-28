import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
// import Slideshow from "./beginnerspanish/slideshow";
import Card from "./beginnerspanish/flashcard";
import Module from "./Module";
import './slideshow.css';
const baseURL = "http://localhost:3003";


const Slideshow = ({slides}) =>{
    const [curr, setCurr] = React.useState(0)
    const { length } = slides;
    // console.log(curr);

    const goToNext = () => {
       
        setCurr(curr === length - 1 ? 0 : curr + 1);
       

    }
    const goToPrev = () =>{
        setCurr(curr === 0 ? length - 1 : curr - 1);
    }
    // React.useEffect(() => {
    //    setTimeout(goToNext, 2000)
    //   })
    if (!Array.isArray(slides) || length <=0 ){
        return null;
    }
 
    return(

        <section className="slider">
            <button className="arrow" onClick={goToPrev}>&#8592;</button>
            {slides.map((s,i)=>(
               
                <div className={i === curr ? "slide active" : "slide"} key={s.card_num}>
                      <Card className={`i === curr ? "slide active" : "slide"`} key={s.card_num} frontSide = {s.english} backSide = {s.spanish}/>
                    
                </div>
              
            ))}
            <button className="arrow" onClick={goToNext}>&#8594;</button>
        </section>
    )
}
// const Main = () => {
//     return (
//       <main>
//         <Slideshow slides={[defaultSlides]} />
//       </main>
//     );
//   }
  


export default Slideshow;