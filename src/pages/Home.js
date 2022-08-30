import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Introduction = styled.p`
  font-weight: 700;
  text-align: center;
  margin-top: 10%;
  line-height: 2em;
`;

const Home = () => {
  return (
    <Wrapper>
      <Introduction>
        Welcome to The Upsolver - Manages your contests <br />
        for upsolving. Upsolving means to solve the <br />
        contest problems after the contest is over. Track the<br />
        problems that you could not solve during the contest.
      </Introduction>
    </Wrapper>
  );
};

export default Home;
