import React from "react";
import { Redirect } from "react-router-dom";
import auth from '../../service/Auth';

import Quizform from './Quizform'
//import Questionform from './Questionform';

import {Navigation} from '../../layout/Navbar';
import Footer from '../../layout/Footer';

export default function Dashboard() {
  const authT = auth.sessionStorageGetItem(); 

  return (
    <div>
      {authT ? null : <Redirect to="/" />}
      <Navigation title={'Soveltommi'} />
      
      
      <h1 className="user__header detail_header">Tervetuloa kojelaudalle</h1>
      <Quizform/>
      {/*  <Questionform /> */}
    
      <div className="annoyingPopUpBot">Hei, Olen ärsyttävä chatbotti sivun alakulmassa. Enkä voi auttaa.</div>
    <Footer />

    </div>
  );
}
