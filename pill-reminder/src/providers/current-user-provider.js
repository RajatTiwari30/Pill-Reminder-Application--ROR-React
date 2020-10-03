import React,{useState} from 'react';
import {CurrentUserContext} from '../context/user-context';
import {Constant} from '../constants/api_constants'
export const CurrentUserProvider = ({children}) => {
    let token = localStorage.getItem(Constant.AUTH_TOKEN);
  
    const [state, setState] = useState({
      isLoading: false,
      isLoggedIn: token ? true : false, 
      currentUser: token  // We will fix this (if needed)
    })
  
    return(
      <CurrentUserContext.Provider value={[state, setState]}>
        {children}
      </CurrentUserContext.Provider>
    )
  }