import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { signInWithGoogle } from '../firebase'
import { Link } from 'react-router-dom'
const CartTotals = () => {
  let { state } = useCartContext();
  let { signInUser } = useUserContext();
  ////
  let signInGoogle = () => {
    signInWithGoogle().then(res => {
      signInUser(res.user)
    }).catch(error => {
      console.log(error.message)
    })
  }
  return <Wrapper>
    <div>
      <article>
        <h5>
          subtotal :<span>{formatPrice(state.cartTotal)}</span>
        </h5>
        <p>
          shipping fee :<span>{formatPrice(state.shipping)}</span>
        </p>
        <hr />
        <h4>
          order total :<span>{formatPrice(state.cartTotal + state.shipping)}</span>
        </h4>
      </article>
      {
        !(localStorage.getItem('name')) &&
        <Link className='btn' to={'/login'}>Login</Link>

      }
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 80%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
      @media (min-width: 776px) {
    width:100%
  }
  }
`

export default CartTotals
