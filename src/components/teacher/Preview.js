import React, { useState} from "react";
import Checkbox from './Checkbox'

export default function Preview({ questions, toggleChecked }) {

    let checkBoxInput = questions.map(option => {
        let count = 0;
        let unikey = option.id;
        return (
          <Checkbox option = {option} count = {count} unikey = {unikey} key = {option.id} toggleChecked = {toggleChecked}/>
        )
      })

  return (
    <div>
      {checkBoxInput}
    </div>
  );
}
