import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import auth from "../../service/Auth";
import QuizTab from "./QuizTab";
import StatusMessage from "./StatusMessage";

import { Navigation } from "../../layout/Navbar";
import Footer from "../../layout/Footer";

export default function Dashboard() {
  const authT = auth.sessionStorageGetItem();
  const [successMessage, setSuccessMessage] = useState(false);

  const showSuccessMessage = msg => {
    if (msg) {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    }
  };

  return (
    <div>
      {authT ? null : <Redirect to="/" />}
      {successMessage ? (
        <StatusMessage successMessage={"Tentti lähetetty."} />
      ) : null}
      <Navigation title={"Soveltommi"} />

      <h1 className="user__header detail_header">Tervetuloa kojelaudalle</h1>
      <QuizTab showSuccessMessage={showSuccessMessage} />

      <div className="annoyingPopUpBot">
        Hei, Olen ärsyttävä chatbotti sivun alakulmassa. Enkä voi auttaa.
      </div>
      <Footer />
    </div>
  );
}
