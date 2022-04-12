import React from 'react'
import ReactLoading from "react-loading";
import styled from 'styled-components'
const Loading = () => {
  return <Wrapper > <ReactLoading type={'spinningBubbles'} color="#453227" /></Wrapper>
}
const Wrapper = styled.div`
position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%,75%);
`

export default Loading
