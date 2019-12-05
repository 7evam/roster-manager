import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import TeamList from './TeamList'
import LeagueList from './LeagueList'
import styled from 'styled-components';
import Roster from './Roster'
import Home from './Home'
import NotFound from './NotFound'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import AjaxAdapter from './AjaxAdapter';

const User = AjaxAdapter('/api/users')

const Container = styled.div`
display: flex;
justify-content: center;
`;

class App extends React.Component {

  constructor(){
  super();
  this.state = {
    isLoaded: false,
    userId: 2,
    user: null,
  }
  this.getUser = this.getUser.bind(this);
}

  async componentDidMount(){
    await this.getUser(this.state.userId);
    this.setState({
      isLoaded:true
    })
  }

  async getUser(userId, comp) {
   this.setState({
     user: await User.getUser(userId),
   });
 }

  render(){
    const { user } = this.state;

    if (user === null) {
      return null;
    }

    return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/roster'
          render={(props)=><Roster {...props} user={this.state.user}/>}
        />

        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
  }
}

//getUser={this.getUser} user={this.state.user}/>

export default App;
