import React, { createElement } from 'react'
import {Navigation} from '../../layout/Navbar'
export default function ScoreIndividual({result, id, question, data, location, match}) {
    /* console.log("data",data)
    console.log("result",result)
    console.log("question",question)
    console.log("id",id) */
    /* console.log("individual data", location.result )
    console.log("match params id", match.params.id)
    console.log("location result name id", location.result.name.id)
    console.log("location", location) */
    let counter = 0;
    let keyCount = 0;

        /* if(match.params.id == location.result.name.id){
         console.log("hello")} */
    
     if(location.result === undefined) {
         return (
             <div className="text-white">
                 <p>Et klikannut linkkiä</p>
                 <a href="/scores" className="registerUser">takaisin scoreihin</a>
             </div>
         )
     }    
        const nameData = location.result.name
        console.log(nameData)
        const resultDisplay = nameData.results.map(res => {
            return { value: res.value, count: res.count, isCorrect: res.isCorrect}

        })
             
         
        {resultDisplay.map(score => {
            /*  console.log(score); */
             counter += score.count;
             /* console.log(counter); */
             if (score.isCorrect === true) {
               return <span key={keyCount++}>{Math.round((score.count / counter) * 100)}% got it right</span>;
             }
           })}
    console.log(resultDisplay)
    
    
    return (
        <div className="text-white">
          <Navigation title={"Soveltommi"} />
       <br />
       <div className="inline">
       <p className="text-white">individual scores per question appear here</p>
        <span>{nameData.id}</span>
       

        <div id="resultsDiv"></div>
        {nameData.results.map(res => {
        let color = { backgroundColor: "#fff" };

        if (res.isCorrect === true) {
          color = { backgroundColor: "#33dd22" };
        } else {
          color = { backgroundColor: "#eedd9d" };
        }
        return (
          <div className="inline individualMarginDiv">
              
            <div className="inline individualColorDiv" style={color}>
              <div className="">
              <span className="studentSpan">{res.count ? res.count : 0} respondents ({Math.round((res.count / counter) * 100)}%) </span>
               
              </div>
            </div>
            <div className="">
                
              <div className="inlinePercent"> {res.value} </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  
        
    )
    
}
