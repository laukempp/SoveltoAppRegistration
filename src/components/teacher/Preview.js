import React from "react";
import Checkbox from './Checkbox'

export default function Preview({ questions, toggleChecked, tags }) {
  const tagFilter = (array1, array2) => {
      array1.forEach(element => {
     if(element.q_tags) {element.q_tags = element.q_tags.filter(item => {
      return array2.includes(item)
    })}
    })
    return array1
  }
    console.log("tagfilter function",tagFilter(questions, tags))
    console.log("tags",tags)
  const sortedQuestions = tagFilter(questions, tags).sort((array1, array2) => {
     if(array2[0]) {return array2.q_tags.length - array1.q_tags.length}
     return ""
  })
  console.log(sortedQuestions)
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
