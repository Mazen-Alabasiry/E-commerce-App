import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  SYNC_CART_LENGTH,
  SYNC_LOCAL_STORAGE,
  ADD_TO_LOCAL_STORAGE
} from '../actions'


const cart_reducer = (state, action) => {

  switch (action.type) {

    case ADD_TO_CART:
      const { id, product, amount, color } = action.payload
      const tempItem = state.cartItems.find((i) => i.id === id + color)
      if (tempItem) {
        const tempCart = state.cartItems.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })

        return { ...state, cartItems: tempCart }
      } else {
        let shipping = false
        if (product.shipping) {
          shipping = true
        }
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
          shipping: shipping
        }

        return { ...state, cartItems: [...state.cartItems, newItem] }
      }
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case REMOVE_CART_ITEM:
      return ({
        ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload.id),
        cartLength: state.cartLength - action.payload.amount
      });
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case CLEAR_CART:
      return ({ ...state, cartItems: [] });
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case SYNC_CART_LENGTH:
      let newLength = 0;
      state.cartItems.forEach(item => {
        newLength += item.amount;
      })
      return ({ ...state, cartLength: newLength });
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case COUNT_CART_TOTALS:
      let total = 0;
      let shipping = 0
      state.cartItems.forEach(item => {
        total += item.amount * item.price;
        item.shipping && (shipping += item.price * (10 / 100))
      })
      return ({ ...state, cartTotal: total, shipping: shipping });
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case TOGGLE_CART_ITEM_AMOUNT:
      const { ProductID, value } = action.payload;
      const tempCart = state.cartItems.map((item) => {
        if (item.id === ProductID) {
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...item, amount: newAmount }
          }
        }
        return item
      })
      return { ...state, cartItems: tempCart }
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case ADD_TO_LOCAL_STORAGE:
      if (localStorage.getItem('name')) {
        localStorage.setItem('cart', JSON.stringify(state))
      }
      return ({ ...state });
    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    case SYNC_LOCAL_STORAGE:
      if (localStorage.getItem('name')) {
        const newState = JSON.parse(localStorage.getItem('cart'))
        return (newState)
      } else {
        return ({ ...state })
      }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }


}

export default cart_reducer
