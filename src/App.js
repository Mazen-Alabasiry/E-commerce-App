import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar } from './components'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import ErrorPage from './pages/ErrorPage'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
function App() {
  return <>
    <Navbar />
    <Sidebar />
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route exact path='/about' element={<AboutPage />} />
      <Route exact path='/products' element={<ProductsPage />} />
      <Route exact path='/products/:id' element={<SingleProductPage />} />
      <Route exact path='/cart' element={<CartPage />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signUp' element={<SignUp />} />
      <Route exact path='*' element={<ErrorPage />} />
    </Routes>
  </>
}

export default App
