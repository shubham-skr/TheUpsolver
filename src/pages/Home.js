import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
`
const Introduction = styled.p`
  font-weight: 700;
  //font-family: monospace;
  text-align: center;
  margin-top: 10%;
  line-height: 1.7em;
`

const Home = () => {
  return (
    <Wrapper>
      <Introduction>
      Welcome to The Upsolver. Manage your contests for upsolving. <br />
      Upsolving means to solve the contest problems after the contest is <br />
      over. Track those problems that you couldn't solve during the contest. <br />
      </Introduction>
    </Wrapper>
  )
}

export default Home