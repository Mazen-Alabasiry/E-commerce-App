import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

const CartPage = () => {
  let { state } = useCartContext();

  if (state.cartItems.length === 0) {
    return <Wrapper>
      <div className='empty section section-center'>
        <h2>Your cart is empty</h2>
        <Link className='btn' to={'/products'}> Fill It</Link>
      </div>
    </Wrapper>
  }
  return <Wrapper>
    <PageHero location={'cart'} link='home' />
    <main>
      <CartContent />
    </main>
  </Wrapper>
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
