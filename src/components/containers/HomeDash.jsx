/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { config } from 'dotenv';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '../layouts/Dashboard';
import HomeFab from '../layouts/Fab';
import DashboardBG from '../../images/Home_Dash.svg';

config();

const useStyles = makeStyles(() => ({
  backdrop: {
    backgroundImage: `url(${DashboardBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
}));

export default function HomeDash() {
  const [tableData, setData] = useState([]);
  const [fetchErr, setFetchErr] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const handleRowClick = (row = []) => {
    const clickedRow = JSON.stringify(row);
    localStorage.setItem('clickedRow', clickedRow);
    history.push('/home/twit');
  };

  const handleFabClick = () => {
    history.push('/home/twit/compose');
  };

  const columns = ['name', 'content', 'created on', { name: 'id', options: { display: false } }];

  const options = {
    filterType: 'checkbox',
    onRowClick: (rowData) => handleRowClick(rowData),
  };

  const reqURL = process.env.NODE_ENV === 'production' ? 'https://twitee-app.herokuapp.com/api/v1/twits/all' : 'http://localhost:5000/api/v1/twits/all';
  const token = localStorage.getItem('twitee-app-token');
  useEffect(() => {
    fetch(reqURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        token,
      },
      method: 'GET',
    }).then((response) => response.json())
      .then(({ error, data }) => {
        if (error) {
          if (error.messages) {
            setFetchErr(error.messages[error.messages.length - 1].msg);
            history.push('/signin');
          } else if (error.message) {
            setFetchErr(error.message);
            history.push('/signin');
          }
        } else {
          const rowData = data.twits.rows.map(
            ({
              User: { name }, content, createdAt, id,
            }) => ([name, content, createdAt, id]),
          );
          setData(rowData);
        }
      }).catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Dashboard fetchErr={fetchErr} homeSelect>
        <div className={classes.backdrop}>
          <MUIDataTable
            title="Twits"
            columns={columns}
            options={options}
            data={tableData}
          />
          <Hidden implementation="css" smUp>
            <HomeFab handleClick={handleFabClick} />
          </Hidden>
        </div>
      </Dashboard>
    </>
  );
}
