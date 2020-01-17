import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import {Provider} from 'react-redux';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <div>
      <AppNavbar />
      <div className="App">
        <Provider store={store}>
          <Home />
        </Provider>
      </div>
    </div>
  );
}

export default App;
