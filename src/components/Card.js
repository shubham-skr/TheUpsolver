import React from 'react';
import styled from 'styled-components';
import { Badge } from 'reactstrap';
import { contestsActions } from '../store/reducers/contests';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import EditContest from './EditContest';
import Note from './Note';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 0.8em 1em 0.7em 1em;
  height: 260px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  box-shadow: rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 1em;
  -webkit-transition: all 0.25 linear 0s !important;
    -moz-transition: all 0.25s linear 0s !important;
    -o-transition: all 0.25s linear 0s !important;
    transition: all 0.25s linear 0s !important;

  &:hover {
    transform: scale(1.03);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10pxb;
  }
`;

const ContestName = styled.div`
  font-size: 1.1em;
  margin-bottom: 1em;
  font-weight: 700;
  word-wrap: break-word;
  height: 80px;
  text-transform: capitalize;
  overflow: hidden;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Problem = styled.div`
  overflow: scroll;
  margin-bottom: 1em;
  height: 180px;

  .badge {
    margin-right: 3px;
    margin-bottom: 4px;
    font-size: 0.8em;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Solved = styled.div`
  margin-bottom: 0.5em;
`;

const Upsolve = styled.div``;

const CardBtn = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FunctionalBtn = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8em;
`;

const DoneBtn = styled.div`
  font-size: 1.6em;
  color: ${(props) => props.bgColor};
`;

const DeleteBtn = styled.div`
  cursor: pointer;
  color: red;
  font-size: 1.2em;
`;

const Card = ({ contest, index }) => {
  const dispatch = useDispatch();

  const deleteContest = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/contest/${contest._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(contestsActions.removeContest(contest));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Wrapper
      boxShadow={contest.done ? 'rgba(0, 255, 0, 0.6)' : 'rgba(255, 0, 0, 0.6)'}
    >
      <ContestName>
        <a href={contest.url} target='_blank' rel='noreferrer'>
          {contest.name}
        </a>
      </ContestName>
      <Problem>
        <Solved>
          {contest.solve.map((rating, index) => (
            <Badge key={index} className='badge' color='success'>
              {rating}
            </Badge>
          ))}
        </Solved>
        <Upsolve>
          {contest.upsolve.map((rating, index) => (
            <Badge key={index} className='badge' color='danger'>
              {rating}
            </Badge>
          ))}
        </Upsolve>
      </Problem>
      <CardBtn>
        <DoneBtn bgColor={contest.done ? 'green' : 'red'}>
          <i class='fa-solid fa-circle-check'></i>
        </DoneBtn>
        <FunctionalBtn>
          <Note id={'note' + index} noteText={contest.note} />
          <EditContest initialContest={contest} index={index} />
          <DeleteBtn onClick={deleteContest}>
            <i class='fa-solid fa-trash deleteBtn'></i>
          </DeleteBtn>
        </FunctionalBtn>
      </CardBtn>
    </Wrapper>
  );
};

export default Card;
