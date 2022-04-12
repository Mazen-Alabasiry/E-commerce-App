import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  SYNC_CART_LENGTH,
  ADD_TO_LOCAL_STORAGE,
  SYNC_LOCAL_STORAGE
} from '../actions'


let initialState = {
  cartItems: [],
  cartLength: 0,
  cartTotal: 0,
  shipping: 0,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getLocalStorage = async () => {
      await dispatch({ type: SYNC_LOCAL_STORAGE })
    }
    getLocalStorage();
  }, [])
  /// adding product to cart
  const addToCart = (id, product, amount, color) => {
    dispatch({ type: ADD_TO_CART, payload: { id, product, amount, color } })
    dispatch({ type: COUNT_CART_TOTALS })
    dispatch({ type: SYNC_CART_LENGTH })
    dispatch({ type: ADD_TO_LOCAL_STORAGE })

  }
  /// removing product from cart
  const removeItem = (id, amount) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id, amount } })
    dispatch({ type: COUNT_CART_TOTALS })
    dispatch({ type: SYNC_CART_LENGTH })
    dispatch({ type: ADD_TO_LOCAL_STORAGE })

  }
  /// clear cart
  const clearCart = (id, amount) => {
    dispatch({ type: CLEAR_CART })
    dispatch({ type: COUNT_CART_TOTALS })
    dispatch({ type: SYNC_CART_LENGTH })
    dispatch({ type: ADD_TO_LOCAL_STORAGE })

  }
  /// 
  const toggleAmount = (ProductID, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { ProductID, value } })
    dispatch({ type: COUNT_CART_TOTALS })
    dispatch({ type: SYNC_CART_LENGTH })
    dispatch({ type: ADD_TO_LOCAL_STORAGE })
  }
  return (
    <CartContext.Provider value={{ state, addToCart, removeItem, clearCart, toggleAmount }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
