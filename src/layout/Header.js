import React from 'react';
import styled from 'styled-components';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import AddContest from '../components/AddContest';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: #fff;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    row-gap: 1em;
  }

`;

const Title = styled.div`
  font-size: 1.8em;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
  text-transform: uppercase;
`;

const HeaderBtn = styled.div`
  display: flex;
  column-gap: 1em;
`;

const Header = ({ isLoggedIn, userLogIn }) => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem('token');
    userLogIn();
    navigate('/');
  };

  return (
    <Wrapper>
      <Title>The&nbsp;&nbsp;Upsolver</Title>
      {!isLoggedIn ? (
        <HeaderBtn>
          <LogIn userLogIn={userLogIn} />
          <SignUp userLogIn={userLogIn} />
        </HeaderBtn>
      ) : (
        <HeaderBtn>
          <AddContest />
          <Button color='primary' onClick={logOutHandler}>
            &nbsp;Log out&nbsp;
          </Button>
        </HeaderBtn>
      )}
    </Wrapper>
  );
};

export default Header;
