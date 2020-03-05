import { useState} from 'react';


const useToggle = () => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(false)

    function toggleShow() {
      setShow(!show)
      console.log("Here")
    }

    function toggleContent() {
      setContent(!content)
    }

      
  return {
    show,
    toggleShow,
    content,
    toggleContent
  }
};

export default useToggle;