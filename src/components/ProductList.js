import React, { useEffect } from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  let { state } = useFilterContext()
  let { grid_view, filtered_products } = state;

  //check if no matched result
  if (filtered_products.length === 0) {
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
