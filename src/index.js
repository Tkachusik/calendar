import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import Calendar from './calendar';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import Event from './event';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const store = createStore(reducer);
const router = (
  <Provider store={store}>
     <Router>
        <Switch>
          <Redirect exact from="/" to="/calendar" />
          <Route path="/calendar" component={Calendar} />
          <Route path="/create-event" component={Event} />
        </Switch>
      </Router>
  </Provider>
)

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(router, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
