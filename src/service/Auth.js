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
          console.log(jsonResponse)
        if (jsonResponse.message) {
          return;
        } else {
        auth.sessionStorageAuth(jsonResponse.data);
        sessionStorage.setItem('badge', jsonResponse.badge)
          auth.setToken(jsonResponse.data);
          console.log("Tässä badge " + jsonResponse.badge)
          console.log("token log", auth.token())
          console.log("authenticated log", auth.isAuthenticated())
          console.log(sessionStorage.getItem('badge'))
        }
      });
  };

class Auth {
    constructor() {
        this.auth = '';
        this.authenticated = false;
    }
    isAuthenticated = () => {
        return this.authenticated;
    }
    setToken = (token) => {
        if (token) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        this.auth = token;
    }
    token = () => {
        return this.auth;
    }
    sessionStorageAuth = (token) => {
        sessionStorage.setItem("tommi", token)
    }
    sessionStorageGetItem = () => {
       return sessionStorage.getItem("tommi")
    }
    logOut = () => {
        sessionStorage.removeItem("tommi")
    }
}

const auth = new Auth();

export default auth;


