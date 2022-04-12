import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  let { state, initialState } = useFilterContext()
  let { grid_view, filtered_products, all_products } = state;
  //check if no matched result
  if (filtered_products.length === 0) {
    if (initialState.filters.company === state.filters.company && initialState.filters.category === state.filters.category &&
      initialState.filters.text === state.filters.text && initialState.filters.color === state.filters.color &&
      initialState.filters.shipping === state.filters.shipping) {
      return (<>
        {grid_view ? <GridView products={all_products} /> : <ListView products={all_products} />}
      </>)
    }
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }


  return <>
    {grid_view ? <GridView products={filtered_products} /> : <ListView products={filtered_products} />}
  </>
}

export default ProductList
