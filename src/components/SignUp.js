import axios from 'axios';
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
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const signupHandler = async () => {
    const user = { name, email, password };
    try {
      const response = await axios.post('https://skr-upsolve-api.herokuapp.com/auth/signup', user);
      localStorage.setItem('token', response.data.token);
      setModal(!modal);
      props.userLogIn();
      navigate('/main');
    } catch (error) {
      alert(error.message);
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <Button color='primary' onClick={toggle}>
        &nbsp;Sign up&nbsp;
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                id='name'
                name='name'
                value={name}
                onChange={nameChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={email}
                onChange={emailChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={passwordChangeHandler}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={signupHandler}>
            Sign up
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignUp;
