import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
import { uuid } from "uuidv4";

const SearchTag = ({ suggestions }) => {
  const [tags, setTags] = useState([
    { id: 1, name: "Apples" },
    { id: 2, name: "Pears" }
  ]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  console.log(tags);
  console.log(suggestions);

  const handleAddition = tag => {
    tag["id"] = uuid();
    setTags(tags => [...tags, tag]);
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAddition}
        allowNew={true}
      ></ReactTags>
    </div>
  );
};

export default SearchTag;
