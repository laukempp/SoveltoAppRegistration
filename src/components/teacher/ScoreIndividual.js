import React from 'react'
import {Navigation} from '../../layout/Navbar'

const pixelCounter = (array, count) => {
  let maxPixels = 400;
  let pixelPercent = count / array[0].respondents;
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

    const nameData = location && location.result && location.result.name
    const responses = location && location.result && location.result.scoreData
    console.log(nameData)
    const resultDisplay = nameData && nameData.results.map(res => {
      return { value: res.value, count: res.count, isCorrect: res.isCorrect}
    })

    const resultShow = resultDisplay && resultDisplay.map(score => {
      /*  console.log(score); */
       counter += score.count;
       /* console.log(counter); */
       if (score.isCorrect === true) {
         return <span key={keyCount++}>{Math.round((score.count / counter) * 100)}% got it right</span>;
       }
       return ''
     })

        /* if(match.params.id == location.result.name.id){
         console.log("hello")} */
    
     if(location.result === undefined && sessionStorage.getItem("tommi") === null) {
         return (
             <div className="text-white">
                 <p>Token vanhentunut, kirjaudu sisään uudelleen jatkaaksesi</p>
                 <a href="/login/" className="registerUser">kirjaudu sisään</a>
             </div>
         )
     }    
     else if (location.result === undefined) {
      return (<div className="text-white">
      <p>Et klikannut linkkiä</p>
      <a href="/dashboard/scores" className="registerUser">takaisin scoreihin</a>
  </div>)
     }

    console.log(resultDisplay) 
    
    return (
        <div className="text-white">
          <Navigation title={"Soveltommi"} />
       <br />
       
       <p className="text-white"> Question: {nameData.question}, ID: <span>{nameData.id}</span></p>
       <p>{resultShow}</p>
        
       <table className="inline-table">

        <tbody className="inline">
        <tr className="min-height">

      {nameData.results.map((res, i) => {
        let color = { backgroundColor: "#fff", border: 'black' };
        let padding = { bottom: '0'}
        console.log(res.count)
        console.log("pixelcounter", pixelCounter(responses, res.count));
        let changedColor = {backgroundColor: '#33bb22'}
        let keyCount = 0;
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
        let pixelAmount = pixelCounter(responses, res.count)
          let stylePixels = { height: pixelAmount + 'px'}
        if(res.isCorrect === true) {
          
          changedColor = {backgroundColor: '#33bb22'}
          return <td key={keyCount} className="individualColorDiv" style={{...color, ...padding}}>{res.value}<div className="heightDiv" style={{...stylePixels, ...changedColor}}>{res.count} respondents</div></td>
        }
        else
        keyCount=+5
        changedColor = {backgroundColor: '#eecc9d'}
        return <td key={'hello'+keyCount+i} className="individualColorDiv min-height" style={{...color, ...padding}}>  {res.value}<div className="heightDiv min-height" style={{...stylePixels, ...changedColor}}>{res.count} respondents</div></td>
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
