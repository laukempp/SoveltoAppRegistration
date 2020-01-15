const url = "/register";

//Rekisteröidään käyttäjä

export const registerUser = user => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }).then(res => res.json());
};
