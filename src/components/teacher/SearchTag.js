import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
import { uuid } from "uuidv4";

const SearchTag = ({ tags, suggestions, collectTags }) => {

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  console.log(tags);
  console.log(suggestions);

  const handleAddition = tag => {
    tag["id"] = uuid();
    setTags(tags => [...tags, tag]);
  };

  collectTags(tags)

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
