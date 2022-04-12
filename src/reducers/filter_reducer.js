import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let prices = [];
      action.payload.forEach(element => {
        prices.push(element.price)
      });
      let minPrice = Math.min(...prices);
      let maxPrice = Math.max(...prices);
      return ({ ...state, filtered_products: action.payload, all_products: action.payload, filters: { ...state.filters, min_price: minPrice, max_price: maxPrice, price: maxPrice } })
    //
    case SET_GRIDVIEW:
      return ({ ...state, grid_view: true })
    case SET_LISTVIEW:
      return ({ ...state, grid_view: false })
    case UPDATE_SORT:
      return ({ ...state, sort: action.payload })
    case SORT_PRODUCTS:

      return ({ ...state, filtered_products: action.payload })

    ///////////
    case UPDATE_FILTERS:
      let key = action.payload.key;
      let value = action.payload.value
      if (key === 'shipping') {
        return ({ ...state, filters: { ...state.filters, shipping: !state.filters.shipping } })
      } else {
        return ({ ...state, filters: { ...state.filters, [key]: value } })
      }

    /////////////
    case FILTER_PRODUCTS:
      const { all_products } = state
      const { text, category, company, color, price, shipping } = state.filters
      let tempProducts = [...all_products]
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        }
        )
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => { return product.category === category }
        )
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => { return product.company === company }
        )
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color)
        })
      }

      // filter by price
      tempProducts = tempProducts.filter((product) => { return product.price <= price })

      // filter by shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product) => { return product.shipping === true })
      }

      return { ...state, filtered_products: tempProducts }

    case CLEAR_FILTERS:
      return {
        ...state,
        filtered_products: [],
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
    default: throw new Error(`No Matching "${action.type}" - action type`)

  }

}

export default filter_reducer
