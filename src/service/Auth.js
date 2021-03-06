const url = "/login";
export const loginUser = user => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .then(jsonResponse => {
      if (jsonResponse.message) {
        return;
      } else {
        auth.sessionStorageAuth(jsonResponse.data);
        sessionStorage.setItem("badge", jsonResponse.badge);
        auth.setToken(jsonResponse.data);
      }
    });
};

// Funktio, jota kutsutaan logoutin yhteydessä
// export const clearTemporary = () => {
//   let badge = sessionStorage.getItem("badge");
//   return fetch("/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ badge: badge })
//   });
// };

class Auth {
  constructor() {
    this.auth = "";
    this.authenticated = false;
  }
  isAuthenticated = () => {
    return this.authenticated;
  };
  setToken = token => {
    if (token) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    this.auth = token;
  };
  token = () => {
    return this.auth;
  };
  sessionStorageAuth = token => {
    sessionStorage.setItem("tommi", token);
  };
  sessionStorageGetItem = () => {
    return sessionStorage.getItem("tommi");
  };
  logOut = () => {
    // clearTemporary();
    sessionStorage.removeItem("tommi");
  };
}

const auth = new Auth();

export default auth;
