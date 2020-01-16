import React,{ useEffect} from 'react'

export default function RegRedirect() {
    useEffect(() => {
        setTimeout(() => {
           window.location.assign('login'); 
        }, 1500)     
    })
    return (
        <div>
            
        </div>
    )
}
