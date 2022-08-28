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

const initialContest = {
  name: '',
  url: '',
  solve: '',
  upsolve: '',
  note: '',
};

const AddContest = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [contest, setContest] = useState(initialContest);

  const toggle = () => setModal(!modal);

  const contestChangeHandler = async (event) => {
    setContest((prevState) => {
      prevState[event.target.name] = event.target.value;
      return { ...prevState };
    });
  };

  const addContestHandler = async () => {
    const newContest = { ...contest };
    const solveString = newContest.solve.trim().replace(/\s\s+/g, ' ');
    const upsolveString = newContest.upsolve.trim().replace(/\s\s+/g, ' ');
    if (solveString.length !== 0) newContest.solve = solveString.split(' ');
    else newContest.solve = [];

    if (upsolveString.length !== 0) newContest.upsolve = upsolveString.split(' ');
    else newContest.upsolve = [];

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/contest', newContest, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(contestsActions.addContest(response.data));
      setModal(!modal);
    } catch (error) {
      alert(error.message);
    }
    setContest(initialContest);
  };

  return (
    <div>
      <Button color='primary' onClick={toggle}>
        Add Contest
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
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
                maxLength='250'
                value={contest.note}
                onChange={contestChangeHandler}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={addContestHandler}>
            Add
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddContest;
