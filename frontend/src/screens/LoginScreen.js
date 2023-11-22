import React, { useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { login } from '../actions/userActions'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search? location.search.split("=")[1] : "/";
  
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect]);
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Sign In</Button>
      </Form>
      <Row className='py-3'>
        <Col xs={12} md={6}>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Don't have an account?</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen