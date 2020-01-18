import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import {Provider} from 'react-redux';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import HomePage from './components/HomePage';
import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <AppNavbar />
      <Router>
        <div className="App">
          <Provider store={store}>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" exact component={Home} />
          </Provider>
        </div>
      </Router>
    </div>
  );
}

export default App;
