import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Introduction = styled.p`
  font-weight: 700;
  text-align: justify;
  margin-top: 10%;
  line-height: 2em;
  width: 500px;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 650px) {
    width: 90%;
    margin-top: 20%;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Introduction>
        Welcome to The Upsolver - manage your contests for upsolving. Upsolving means to solve the 
        contest problems after the contest is over. Track the problems that you 
        could not solve during the contest.
      </Introduction>
    </Wrapper>
  );
};

export default Home;
