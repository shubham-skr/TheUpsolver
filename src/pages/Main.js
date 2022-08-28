import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Card from '../components/Card';
import { contestsActions } from '../store/reducers/contests';

const Wrapper = styled.main`
  display: flex;
  align-items: flex-start;
  gap: 2em;
  flex-wrap: wrap;
  padding-top: 2em;
`;

const Main = () => {
  useEffect(() => {
    const getContests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/contest?createdOn', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(contestsActions.setContests(response.data));
      } catch (error) {
        alert(error.message);
      }
    };

    getContests();
  }, []);

  const dispatch = useDispatch();
  const contests = useSelector((state) => state.contests);

  return (
    <Wrapper>
      {contests.length !== 0
        ? contests.map((contest, index) => (
            <Card key={index} index={index} contest={contest} />
          ))
        : ''}
    </Wrapper>
  );
};

export default Main;
