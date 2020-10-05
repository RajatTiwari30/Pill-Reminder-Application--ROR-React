import React from 'react';
import {CurrentUserContext} from '../context/user-context';
import {Link, NavLink, BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Constant} from '../constants/api_constants'
import {API_SESSIONS} from '../constants/api_constants'
import useFetch from '../hooks/use-fetch'
export default function Login() {
  const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
  
   const [user, setUser] = React.useState({
    email: "",
    password: ""
  });
  
   const {isLoading, response, error, doFetch} = useFetch(API_SESSIONS);

  let token = localStorage.getItem(Constant.AUTH_TOKEN);
  
  const handleSubmit = (e) => {
    e.preventDefault();
     doFetch({
      method: "post",
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
  }
  
  // When user logins in
  React.useEffect(() => {
    if (!response) return;

    console.log("RESPONSE: ", response);
    if (!response.token) return;
    
    // Set the auth token in localStorage
    localStorage.setItem(Constant.AUTH_TOKEN,response.token);
    
    
    // Update the userContext
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response
    }))
  },[response])
  
  const handleChange  = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    
    <div className="card p-5" style={{maxWidth:"400px"}}>
      <form onSubmit={handleSubmit}>
        <h4>Welcome to Pill Reminder</h4>
        <div>
          {response && JSON.stringify(response)}
          {error && JSON.stringify(error)}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email"  
            onChange= {handleChange}
            value={user.email}
            name="email"
            className="form-control"  />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" 
            value={user.password}
            onChange= {handleChange}
            name="password"
            className="form-control" />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success">Sign in</button>
        </div>
        <div className="d-flex mt-4 justify-content-around">
          <button className="btn btn-outline-danger">Forgot Password?</button>
          <Link to="/register"><button className="btn btn-outline-dark">New User</button></Link>
        </div>
      </form>
  
    </div>
  )
}
