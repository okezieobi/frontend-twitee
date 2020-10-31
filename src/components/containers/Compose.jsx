/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from 'dotenv';

import Dashboard from '../layouts/Dashboard';
import Form from '../layouts/Form';

config();

export default function Compose() {
  const [content, setContent] = useState('');
  const [contentErr, setContentErr] = useState('');
  const [btnState, setBtnState] = useState(false);
  const history = useHistory();

  const handleSubmit = () => {
    if (!btnState) {
      setBtnState(true);
    }
    const inputData = {
      content,
    };
    const reqURL = process.env.NODE_ENV === 'production' ? 'https://twitee-app.herokuapp.com/api/v1/twits' : 'http://localhost:5000/api/v1/twits';
    const token = localStorage.getItem('twitee-app-token');
    fetch(reqURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        token,
      },
      method: 'POST',
      body: JSON.stringify(inputData),
    }).then((response) => response.json())
      .then(({ error }) => {
        if (error) {
          if (error.messages) {
            setContentErr(error.messages[error.messages.length - 1].msg);
            setBtnState(false);
          } else if (error.message) {
            setContentErr(error.message);
            setBtnState(false);
          } else if (error.status === 401) {
            setContentErr(error.message);
            history.push('/signin');
          }
        } else {
          history.push('/home');
        }
      }).catch((err) => {
        console.log(err);
        setBtnState(false);
      });
  };

  return (
    <Dashboard homeSelect>
      <Form
        handleSubmit={handleSubmit}
        setContent={setContent}
        contentErr={contentErr}
      />
    </Dashboard>
  );
}
