import React from "react";

import auth from '../../service/Auth';
import QuizTab from './QuizTab'

import {Navigation} from '../../layout/Navbar';
import Footer from '../../layout/Footer';

export default function Dashboard() {
  const authT = auth.sessionStorageGetItem(); 
  
  return (
    <div>
      {authT ? (<div><Navigation title={'Soveltommi'} />
       
       <h1 className="user__header detail_header">Tervetuloa kojelaudalle</h1>
       <QuizTab/>
     
       <div className="annoyingPopUpBot">Hei, Olen ärsyttävä chatbotti sivun alakulmassa. Enkä voi auttaa.</div>
     <Footer /></div>) : (auth.logOut(), window.location.assign('/login'))}
      </div>

    
  );
}
