import cookie from "js-cookie";

//set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, { expires: 1 });
  }
};

//remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, { expires: 1 });
  }
};

//get from cookie such as stored token
//will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

//set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to localstorage and cookie during signIn
//this will work like middleware
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE LOCALHOST", response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//access user info from localstorage
//and can easily get the user info form here
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//this is for signing a user out, by clearing the cookie and localhost
//it will serve as a middleware
export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

//this will update the users data in the localstorage when a user has updated his/her profile
export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE", response);
  if (typeof window !== "undefined") {
    //first we get the existing user data
    //auth is rep the existing user data
    let auth = JSON.parse(localStorage.getItem("user"));
    //we update the (auth)
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
