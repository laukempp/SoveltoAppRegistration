import React, {useState} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

/*const suggestions = COUNTRIES.map((country) => {
  return {
    id: country,
    text: country
  }
})*/

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default function SearchTag() {
    const [tags, setTags] = useState([{ id: 'Thailand', text: 'Thailand' },{ id: 'India', text: 'India' }, { id: 'miu', text: 'miu' }]);
    const [suggestions, setSuggestions] = useState([{ id: 'Vietnam', text: 'Vietnam' }, { id: 'Nauru', text: 'Nauru' }])

console.log(tags)

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  }

  const handleAddition = tag => {
   setTags(tags => [...tags, tag]);
  }

  const handleDrag = (tag, currPos, newPos) => {
    //const newTags = tags.slice();

    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    setTags(tags)
  }

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  }

    return (
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
        />
      </div>
    );
}

