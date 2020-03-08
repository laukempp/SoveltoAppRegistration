import { useState} from 'react';


const useToggle = () => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(false)

    function toggleShow() {
      setShow(!show)
    }

    function showQuiz() {
      setContent(true)
    }

    function showQuestion() {
      setContent(false)
    }

      
  return {
    show,
    toggleShow,
    content,
    showQuiz,
    showQuestion
  }
};

export default useToggle;