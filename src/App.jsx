import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Home from './components/layouts/Home';
import Signup from './components/containers/Signup';
import Signin from './components/containers/Signin';
import HomeDash from './components/containers/HomeDash';
import ContentDash from './components/containers/ContentDash';
import ComposeForm from './components/containers/Compose';
import EditForm from './components/containers/Edit';
import Profile from './components/containers/Profile';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/home/twit/edit">
          <EditForm />
        </Route>
        <Route path="/home/twit/compose">
          <ComposeForm />
        </Route>
        <Route path="/home/twit">
          <ContentDash />
        </Route>
        <Route path="/home">
          <HomeDash />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}
