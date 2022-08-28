import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const Wrapper = styled.main`
  background-color: #D4F1F4;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Main = () => {
  return (
    <Wrapper>
      <Card />
    </Wrapper>
  )
}

export default Main