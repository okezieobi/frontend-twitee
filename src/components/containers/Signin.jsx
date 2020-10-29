/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { } from 'dotenv';

import SigninLayout from '../layouts/Signin';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);
  const [signinErr, setSignupErr] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    try {
      if (!btnState) {
        setBtnState(true);
      }
      const inputData = {
        email,
        password,
      };
      const reqURL = process.env.NODE_ENV === 'production' ? 'https://twitee-app.herokuapp.com/api/v1/auth/login' : 'http://localhost:5000/api/v1/auth/login';
      fetch(reqURL, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        method: 'POST',
        body: JSON.stringify(inputData),
      }).then((response) => response.json())
        .then(({ error, token }) => {
          if (error) {
            if (error.messages) setSignupErr(error.messages[error.messages.length - 1].msg);
            else if (error.message) setSignupErr(error.message);
            setBtnState(false);
          } else {
            localStorage.setItem('token', token);
            history.push('/home');
          }
        });
    } catch (err) {
      console.log(err);
      setBtnState(false);
    }
  };

  return (
    <>
      <SigninLayout
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        formBtnState={btnState}
        signinErr={signinErr}
      />
    </>
  );
}
