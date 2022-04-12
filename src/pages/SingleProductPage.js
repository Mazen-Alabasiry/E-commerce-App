import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import { Loading, ProductImages, AddToCart, Stars, PageHero, } from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'




const SingleProductPage = () => {

  let { singleProduct: product, getSingleProduct, loading, error } = useProductsContext();
  let { id } = useParams();
  useEffect(() => {
    getSingleProduct(url + id);
  }, [id])

  if (loading) {
    return <Wrapper>
      <Loading />
    </Wrapper>
  }
  if (error !== '') {
    return (<Wrapper>
      <h5 style={{
        'textTransform': 'none',
        'text- transform': 'none',
        'padding': '30px',
        'font-size': '25px',
        'color': '#795744',
        'textAlign': 'center'
      }}>
        Sorry, {`${error.message}`}.
      </h5>
    </Wrapper>

    )
  }
  return <Wrapper>
    <PageHero location={product.name} link='products' />
    {
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={product.images} />
          <section className='content'>
            <h2>{product.name}</h2>
            <Stars stars={product.stars} reviews={product.reviews} />
            <h5 className='price'>{formatPrice(product.price)}</h5>
            <p className='desc'>{product.description}</p>
            <p className='info'>
              <span>Available : </span>
              {product.stock > 0 ? <span>In stock({product.stock})</span> : <span style={{ color: '#ab7a5f' }}>out of stock</span>}
            </p>
            <p className='info'>
              <span>SKU :</span>
              {product.id}
            </p>
            <p className='info'>
              <span>Shipping Fees :</span>
              {product.shipping ? '10% shipping fee' : 'No Shipping Fee'}
            </p>
            <p className='info'>
              <span>Brand :</span>
              {product.company}
            </p>
            <hr />

            {Object.keys(product).length > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    }
  </Wrapper>


}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
