import React from "react";

export default function Checkbox({ option, count, unikey, toggleChecked }) {

  let boxInfo = (
    <div className="mContainer">
      <div>
        <label className="mQuestion">{option.question}</label>
      </div>
      <div>
        <input type="radio" name="correct" disabled />
        <label htmlFor="correct">{option.correct_answer}</label>
      </div>
      {option.wrong_answer.map(wrongy => {
        count++;
        unikey = unikey + 3;
        return (
          <div key={count}>
            {" "}
            <input type="radio" name={count} disabled />
            <label key={count} htmlFor={count}>
              {wrongy}
            </label>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {boxInfo}
      <input className="previewCheckbox" type="checkbox" name={option.id} onChange={toggleChecked}/>
    </div>
  );
}
