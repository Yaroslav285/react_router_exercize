import React, {Component} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import './components/Users';
import './components/Home'
import Users from "./components/Users";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import Lost from "./components/404";


class App extends Component {

  state = {
    cards: []
  };

  componentWillMount() {
    fetch('https://swapi.co/api/people')
        .then(response => response.json())
        .then(response => this.setState({
          cards: response.results,
          loading: false,
          error: false
        }))
        .catch(error => this.setState({
          loading: false,
          error: true
        }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/users" component={Users}/>
              <Route exact path="/user/:id" render={(props:any) => {
                let cardPosition = props.location.pathname.replace('/user/', '');
                return (
                    <UserDetails card={cardPosition}/>
                )
              }}/>
              <Route component={Lost}/>
            </Switch>
          </header>
        </div>

      </Router>
  );
}
}

export default App;
