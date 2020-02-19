import React, { createElement } from 'react'
import {Navigation} from '../../layout/Navbar'

const pixelCounter = (array, count) => {
  let maxPixels = 400;
  let pixelPercent = count / 10;
  let returnPixels = maxPixels * pixelPercent;
  console.log("array", array)
  console.log("count", count)
  console.log("pixel percent", pixelPercent)
  return returnPixels;
}
export default function ScoreIndividual({result, id, question, scoreData, location, match}) {
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
        const responses = location.result.scoreData
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
       
       <p className="text-white">individual scores per question appear here</p>
        <span>{nameData.id}</span>
       <table className="inline-table">

        <tbody className="inline">
        <tr>
      {nameData.results.map(res => {
        let color = { backgroundColor: "#fff", border: 'black' };
        let padding = { paddingTop: '0%'}
        console.log(res.count)
        console.log("pixelcounter", pixelCounter(responses, res.count));
        let height = { height: '5%'}
        let additionalHeight = { height: 400}
        let changedColor = {backgroundColor: '#33bb22'}
        let additionalPadding = { paddingTop: '0%'}
        let addedPercent = 5;
        let i = 0;
        if (res.isCorrect === true) {
          color = { backgroundColor: "#33dd22" };
          
        } else {
          color = { backgroundColor: "#eedd9d" };
        }

        
       /*  if(res.count > 1){
        for(i in res.count){
          if(res.count > i){
          additionalPadding = { paddingTop: Math.abs(20 + 30)+'%'}
          return <div style={{...color}}> {res.count}#######</div>
        }
          
        }} */
        if(res.count > 1) {
          return <td className="individualColorDiv" style={{...color, ...padding}}><div style={{...additionalHeight, ...changedColor}}> {res.count}#######</div></td>
        }
        else
        return <td className="individualColorDiv" style={{...color, ...padding}}><div style={{}}> {res.count}#######</div></td>
      })

        // {/* {return (
          
           
            
              
        //       <td className="studentSpan">{res.count ? res.count : 0} respondents ({Math.round((res.count / counter) * 100)}%) </td>
            
            
                
        //       <td className="inlinePercent"> {res.value} </td></tr></tr>
            
          
        // )}; */}
      }
     
      </tr></tbody></table>
    </div>
  
        
    )
    
}
