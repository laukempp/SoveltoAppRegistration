import React from 'react'
import {Navigation} from '../../layout/Navbar'
export default function ScoreIndividual({result, id, question, data, location, match}) {
    /* console.log("data",data)
    console.log("result",result)
    console.log("question",question)
    console.log("id",id) */
    console.log("individual data", location.result )
    console.log("match params id", match.params.id)
    console.log("location result name id", location.result.name.id)
    
    
        if(match.params.id == location.result.name.id){
         console.log("hello")}
    
    return (
        <div className="text-white">
          {/* <Navigation title={"Soveltommi"} /> */}
       <br />
       
       <p className="text-white">individual scores per question appear here</p>
      
        </div>
    )
}
