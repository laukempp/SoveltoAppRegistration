import { useState, useEffect } from 'react';
import {getTags} from "../../service/Request"
import { uuid } from "uuidv4";

const useTags = () => {
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState();

    useEffect(() => {
        getTags().then(res => setSuggestions(res));
      }, [setSuggestions]);
    
      const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = tag => {
        tag["id"] = uuid();
        setTags(tags => [...tags, tag]);
      };
    
      const tagArray = Object.values(tags && tags.map(item => item.name));
    
      const onValidate = tag => {
        return tag.name.length <= 20 && tag.name.length >= 2;
      }

      console.log("usetags", tags)

  return {
    tags,
    suggestions,
    handleDelete,
    handleAddition,
    tagArray,
    onValidate
  }
};

export default useTags;