import React, { useContext, useState } from 'react'
import { signOutGoogle } from '../firebase'
import { useCartContext } from './cart_context'
const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  let { state } = useCartContext();

  const signInUser = (user) => {
    setCurrentUser(user)
    localStorage.setItem('name', user.displayName)
    localStorage.setItem('email', user.email)
    localStorage.setItem('photo', user.photoURL)
    localStorage.setItem('cart', JSON.stringify(state))
  }
  const signOutUser = () => {

    signOutGoogle();
    setCurrentUser({})
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('photo')
    localStorage.removeItem('cart')
  }

  return (
    <UserContext.Provider value={{ signInUser, currentUser, signOutUser }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
