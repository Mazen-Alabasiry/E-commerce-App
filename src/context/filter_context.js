import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  let { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState)
  //
  useEffect(() => {
    const getAllProducts = async () => {
      await dispatch({ type: LOAD_PRODUCTS, payload: products })
    }
    getAllProducts()
  }, [products])
  //
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  //

  //
  const updateSort = (e) => {
    dispatch({ type: UPDATE_SORT, payload: e.target.value })
    let sortedProducts = [];
    // sort by lowest
    if (e.target.value === 'price-lowest') {
      sortedProducts = state.filtered_products?.sort((a, b) => (a.price > b.price ? 1 : -1))
    }
    // sort by highest
    if (e.target.value === 'price-highest') {
      sortedProducts = state.filtered_products?.sort((a, b) => (a.price > b.price ? -1 : 1))
    }
    // sort by A to Z
    if (e.target.value === 'name-a') {
      sortedProducts = state.filtered_products?.sort((a, b) => (a.name > b.name ? 1 : -1))
    }
    // sort by Z to A
    if (e.target.value === 'name-z') {
      sortedProducts = state.filtered_products?.sort((a, b) => (a.name > b.name ? -1 : 1))
    }
    dispatch({ type: SORT_PRODUCTS, payload: sortedProducts })
  }
  //

  const updateFilters = (e) => {
    dispatch({ type: UPDATE_FILTERS, payload: { key: e.target.name, value: e.target.value } })
    dispatch({ type: FILTER_PRODUCTS })
    // console.log(state)
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider value={{ state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
