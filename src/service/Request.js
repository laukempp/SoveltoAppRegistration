const url = "/api/topics/";

export const fetchQuestions = querydata => {
  let token = sessionStorage.getItem("tommi");

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(querydata)
  }).then(res => res.json());
};

export const postQuiz = quiz => {
  let token = sessionStorage.getItem("tommi");
  return fetch("api/topics/quiz", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(quiz)
  });
};

export const getStudentQs = array => {
  let token = sessionStorage.getItem("tommi");
  console.log(JSON.stringify(array));
  return fetch("/api/topics/quiz", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(array)
  }).then(res => res.json());
};

export const postQuestion = question => {
  console.log(JSON.stringify(question));
  let token = sessionStorage.getItem("tommi");
  return fetch(`/api/topics/question`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(question)
  }).then(res => res.json());
};

// export const postTemporaryQuestion = question => {
//   let token = sessionStorage.getItem("tommi");
//   return fetch(`/api/temporaryquestion`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: token },
//     body: JSON.stringify(question)
//   }).then(res => res.json());
// };

export const getTopics = topic => {
  let token = sessionStorage.getItem("tommi");
  return fetch(url, {
    headers: {
      Authorization: token
    }
  })
    .then(res => res.json())
    .catch(err => err);
};

export const postScores = score => {
  console.log("Tässä näkyy score" + score);
  return fetch(`/api/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score)
  });
};

export const getScores = score => {
  return fetch("/api/scores/all", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score)
  }).then(res => res.json());
};

export const getTags = () => {
  let token = sessionStorage.getItem("tommi");
  return fetch("/api/topics/tags", {
    headers: {
      Authorization: token
    }
  })
    .then(res => res.json())
    .catch(err => err);
};
