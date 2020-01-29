import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import {Provider} from 'react-redux';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import HomePage from './components/HomePage';
import History from './components/History';
import Playlist from './components/Playlist';
import Player from './components/Player';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {loadUser} from './actions/authActions';

class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return(
      <div>
        <Router>
          <Provider store={store}>
            <AppNavbar />
            <div className="App">
              <Route path="/" exact component={HomePage} />
              <Route path="/home" exact component={Home} />
              <Route path="/history" exact component={History} />
              <Route path="/playlist" exact component={Playlist} />
              <Route path="/player" exact component={Player} />
            </div>
          </Provider>
        </Router>
      </div>
    )
  }
}

export default App;
