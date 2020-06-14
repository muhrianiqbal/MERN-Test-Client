import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//Views
import Login from './views/Login';
import Home from './views/Home';
import Detail from './views/Detail';
import Form from './views/Form';
//Styles
import './styles/App.css';
import 'antd/dist/antd.css';
function App() {
  return (
    <Router>
      <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/detail" exact>
            <Detail />
          </Route>
          <Route path="/form" exact>
            <Form />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
