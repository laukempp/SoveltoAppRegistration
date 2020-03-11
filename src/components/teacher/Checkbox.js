import React from "react";

export default function Checkbox({ option, count, toggleChecked, isSelected }) {

  //Tässä muotoillaan vain näkymä - radiobuttoneita ei voi klikata. 
  let boxInfo = (
    <div className="mContainer">
      <div>
        <label className="mQuestion">{option.question}</label>
      </div>
      <div>
        <input type="radio" disabled />
        <label htmlFor="correct">{option.correct_answer}</label>
      </div>
      {option.wrong_answer.map(wrongy => {
        count++;
        return (
          <div key={count}>
            <input type="radio" disabled />
            <label>{wrongy}</label>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {boxInfo}
      <input className="previewCheckbox" type="checkbox" name={option.id} onChange={toggleChecked} checked={isSelected}/>
    </div>
  );
}
