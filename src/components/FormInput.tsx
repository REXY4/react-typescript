import React, { useState, useContext } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import Logo from '../assets/img/GitHub_Logo_White.png';
import '../styles/component/forminput.css';
import { Api } from '../config/api';
import BasicAlert from './Alert';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

interface FormInputState {
  name: string;
  email: string;
  password: string;
  loginActive: boolean;
  alert: {
    condition: boolean;
    message: string;
    variant: string;
  };
}

const FormInput: React.FC = () => {
  const [form, setForm] = useState<FormInputState>({
    name: '',
    email: '',
    password: '',
    loginActive: true,
    alert: {
      condition: false,
      message: '',
      variant: '',
    },
  });

  const { state ,dispatch } = useContext(UserContext) as { state: any; dispatch: React.Dispatch<any> };
  const navigate = useNavigate();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, loginActive } = form;
    const body = loginActive ? { email, password } : { name, email, password };
    try {
      const response = await Api.post(loginActive ? '/user/login' : '/user/register', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.statusCode === 200) {
        if (loginActive) {
          dispatch({
            type: 'LOGIN',
            payload: response.data.data,
          });
          
          navigate("/home")
        }
        setForm((prevState) => ({
          ...prevState,
          alert: {
            condition: true,
            message: 'Create Data Success',
            variant: 'success',
          },
        }));
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };


  console.log(state)

  const switchForm = () => {
    setForm((prevState) => ({
      ...prevState,
      loginActive: !prevState.loginActive,
    }));
  };

  const { email, password, name, loginActive, alert } = form;

    return (
      <Card className="card-form">
        <Card.Header className="d-flex justify-content-center card-header">
          <Image src={Logo} alt="logo github" className="logo-form-input" />
          <span className="logo-form-input font-logo-input">Jobs</span>
        </Card.Header>
        <Card.Body className="p-5">
          {alert.condition &&  <BasicAlert message="create data success" variant="success"/> }
          <Form onSubmit={onSubmit}>
            {!loginActive && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={name} placeholder="Insert your name" onChange={onChange} />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={email} placeholder="Insert your email" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={password} placeholder="Insert your password" onChange={onChange} />
            </Form.Group>
            <Button disabled={alert.condition} variant="primary" type="submit" id="button-signin">
              Submit
            </Button>
            <Form.Group className="mt-3">
              <Form.Text className="text-muted">
                {loginActive ? "Don't have an account?" : 'Already have an account?'}
                <Button onClick={switchForm} variant="link" id="button-link">
                  {loginActive ? 'Sign up' : 'Log in'}
                </Button>
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
}

export default FormInput
