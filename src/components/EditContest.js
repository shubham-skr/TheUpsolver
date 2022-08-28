import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { contestsActions } from '../store/reducers/contests';
import styled from 'styled-components';

const EditBtn = styled.div`
  cursor: pointer;
  color: green;
  font-size: 1.3em;
`;

const EditContest = ({ initialContest, index }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [contest, setContest] = useState({
    name: initialContest.name,
    url: initialContest.url,
    solve: initialContest.solve.join(' '),
    upsolve: initialContest.upsolve.join(' '),
    note: initialContest.note,
  });

  const toggle = () => setModal(!modal);

  const contestChangeHandler = async (event) => {
    setContest((prevState) => {
      prevState[event.target.name] = event.target.value;
      return { ...prevState };
    });
  };

  const editContestHandler = async () => {
    const newContest = { ...contest };
    const solveString = newContest.solve.trim().replace(/\s\s+/g, ' ');
    const upsolveString = newContest.upsolve.trim().replace(/\s\s+/g, ' ');

    if (solveString.length !== 0) newContest.solve = solveString.split(' ');
    else newContest.solve = [];

    if (upsolveString.length !== 0) newContest.upsolve = upsolveString.split(' ');
    else newContest.upsolve = [];

    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`/contest/${initialContest._id}`, newContest, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(newContest)
      dispatch(contestsActions.updateContest({contest: response.data, index}));
      setModal(!modal);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <EditBtn onClick={toggle}>
        <i class='fa-solid fa-pen-to-square'></i>
      </EditBtn>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='name'>Contest Name</Label>
              <Input
                id='name'
                name='name'
                maxLength='35'
                value={contest.name}
                onChange={contestChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for='url'>Contest URL</Label>
              <Input
                id='url'
                name='url'
                type='url'
                value={contest.url}
                onChange={contestChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for='solve'>
                Solved Problem's Rating (separated by space)
              </Label>
              <Input
                id='solve'
                name='solve'
                maxLength='70'
                value={contest.solve}
                onChange={contestChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for='upsolve'>
                Upsolve Problem's Rating (separated by space)
              </Label>
              <Input
                id='upsolve'
                name='upsolve'
                maxLength='70'
                value={contest.upsolve}
                onChange={contestChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for='note'>Note to Remember</Label>
              <Input
                id='note'
                name='note'
                type='textarea'
                maxLength='100'
                value={contest.note}
                onChange={contestChangeHandler}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={editContestHandler}>
            Edit
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditContest;
