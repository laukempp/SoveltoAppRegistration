export const questionValuesPost = {
    question: "",
    correct_answer: "",
    wrong_answer: [""],
    topics_id: 1,
    q_author: sessionStorage.getItem("badge"),
    q_tags: [],
    istemporary: 0
  };

export const quizValues = {
    name: "",
    topics_id: 0,
    number: 0,
    questionCount: "false",
    q_tags: [],
    teacher_badge: sessionStorage.getItem("badge"),
    useBadge: false,
    timer: 0,
    quiz_type: false
  };
