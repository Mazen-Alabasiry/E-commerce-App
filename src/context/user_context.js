import React, { useContext, useState } from 'react'
import { auth, signInWithGoogle } from '../firebase'
import { useCartContext } from './cart_context'
import { signOut, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  let { state } = useCartContext();
  let navigate = useNavigate();


  // 1- first sign up user
  const SignUserUpWithEmailAndPass = async (email, password) => {

    await createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        signIn(res.user)
        navigate('/');
      })
      .catch(err => {
        setError((err.code.toString().split('/')[1].toUpperCase().split('-').join(' ')))
      })
  }
  // 2- first sign in exist user
  const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).then(res => {
      signIn(res.user)
      navigate('/');
    }).catch(err => {
      setError((err.code.toString().split('/')[1].toUpperCase().split('-').join(' ')))
    })

  }
  //3- sign user with google
  const SignUserWithGoogle = async () => {
    await signInWithGoogle().then(res => {
      signIn(res.user)
      navigate('/');
    }).catch(err => {
      setError((err.code.toString().split('/')[1].toUpperCase().split('-').join(' ')))
    })

  }
  /// sign out user 
  const signOutUser = () => {
    signOut(auth);
    const user = auth.currentUser;
    // deleteUser(user).then(() => {
    //   // User deleted.
    // }).catch((err) => {
    //   setError((err.code.toString().split('/')[1].toUpperCase().split('-').join(' ')))
    //   console.log(error.message)
    // })

    setCurrentUser({})
    localStorage.clear();
  }

  ///////////////
  const signIn = (user) => {
    setCurrentUser(user)
    localStorage.setItem('name', user.displayName)
    localStorage.setItem('email', user.email)
    localStorage.setItem('photo', user.photoURL)
    localStorage.setItem('cart', JSON.stringify(state))
  }



  return (
    <UserContext.Provider value={{
      signInUser, currentUser, signOutUser, SignUserUpWithEmailAndPass,
      SignUserWithGoogle, error, setError
    }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
