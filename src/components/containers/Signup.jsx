/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from 'dotenv';

import SignupLayout from '../layouts/Signup';

config();

export default function Signup() {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [signupErr, setSignupErr] = useState('');
  const [password, setPassword] = useState('');
  const [btnState, setBtnState] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    if (!btnState) {
      setBtnState(true);
    }
    const inputData = {
      name: fname,
      email,
      password,
    };
    const reqURL = process.env.NODE_ENV === 'production' ? 'https://twitee-app.herokuapp.com/api/v1/auth/signup' : 'http://localhost:5000/api/v1/auth/signup';
    fetch(reqURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify(inputData),
    }).then((response) => response.json())
      .then(({ error, data }) => {
        if (error) {
          if (error.messages) {
            setSignupErr(error.messages[error.messages.length - 1].msg);
            setBtnState(false);
          } else if (error.message) {
            setSignupErr(error.message);
            setBtnState(false);
          }
        } else {
          localStorage.setItem('twitee-app-token', data.token);
          history.push('/home');
        }
      }).catch((err) => {
        console.log(err);
        setBtnState(false);
      });
  };

  return (
    <>
      <SignupLayout
        handleSubmit={handleSubmit}
        setFname={setFname}
        setEmail={setEmail}
        setPassword={setPassword}
        formBtnState={btnState}
        signupErr={signupErr}
      />
    </>
  );
}
