import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Introduction = styled.p`
  font-weight: 700;
  text-align: center;
  margin-top: 10%;
  line-height: 1.7em;
`;

const Home = () => {
  return (
    <Wrapper>
      <Introduction>
        Welcome to The Upsolver - Manages your contests for upsolving.
        <br />
        Upsolving means to solve the contest problems after the contest is over.
        <br />
        Track those problems that you could not solve during the contest.
        <br />
      </Introduction>
    </Wrapper>
  );
};

export default Home;
