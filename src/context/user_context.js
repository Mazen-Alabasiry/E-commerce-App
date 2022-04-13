import React, { useContext, useState } from 'react'
import { auth, signInWithGoogle } from '../firebase'
import { useCartContext } from './cart_context'
import { signOut, deleteUser } from 'firebase/auth'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  let { state } = useCartContext();


  const signInUser = () => {
    signInWithGoogle().then(res => {
      signIn(res.user)
    }).catch(error => { console.log(error.message) })

    const signIn = (user) => {
      setCurrentUser(user)
      localStorage.setItem('name', user.displayName)
      localStorage.setItem('email', user.email)
      localStorage.setItem('photo', user.photoURL)
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
  //////////////

  const signOutUser = () => {
    signOut(auth);
    const user = auth.currentUser;
    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => { console.log(error.message) })
    ///////////////
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
