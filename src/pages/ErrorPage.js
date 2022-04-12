import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return <Wrapper>
    <h3>Oops,There Is Something Wrong</h3>
    <Link className='btn ' to={'/'}>Back to home</Link>
  </Wrapper>
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  height:calc(100vh - 160px);
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage
