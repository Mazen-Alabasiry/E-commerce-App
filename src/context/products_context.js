import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  HANDEL_SIDEBAR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  products: [],
  featuredProducts: [],
  singleProduct: {},
  loading: false,
  error: '',
  sidebar: false
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  useEffect(() => {
    getProducts();
  }, [])
  const getProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      let products = await axios.get(url);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products.data })

    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error })
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const getSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      let product = await axios.get(url);

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product.data })
    } catch (error) {
      console.log(error.message)
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error })
    }
  }
  /////
  const handelSidebar = () => {
    dispatch({ type: HANDEL_SIDEBAR })
  }
  ////

  return (
    <ProductsContext.Provider value={{ ...state, getSingleProduct, handelSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
