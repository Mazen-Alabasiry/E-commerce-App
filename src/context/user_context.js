import React, { useContext, useEffect, useState } from 'react'
import { signOutGoogle, checkAuth } from '../firebase'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const signInUser = (user) => {
    setCurrentUser(user)
    localStorage.setItem('name', user.displayName)
    localStorage.setItem('email', user.email)
    localStorage.setItem('photo', user.photoURL)
  }
  const signOutUser = () => {

    signOutGoogle();
    setCurrentUser({})
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('photo')
  }

  return (
    <UserContext.Provider value={{ signInUser, currentUser, signOutUser }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
