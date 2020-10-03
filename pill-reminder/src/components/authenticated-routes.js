import React from 'react';
import {CurrentUserContext} from '../context/user-context';
import {Link, NavLink, BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
function AuthenticatedRoutes({children}) {
    const [userContext, _] = React.useContext(CurrentUserContext);
  
    if (!userContext.isLoggedIn) {
      return <Redirect to = "/" />
    }
  
    return (
      children
    )
  }
  export default AuthenticatedRoutes