import { useState} from 'react';
import { uuid } from "uuidv4";

const useTags = () => {
    const [tags, setTags] = useState([]);

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

      console.log("usetags", tagArray)

  return {
    tags,
    handleDelete,
    handleAddition,
    tagArray,
    onValidate
  }
};

export default useTags;