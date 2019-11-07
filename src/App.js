import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import TeamList from './TeamList'
import LeagueList from './LeagueList'
import styled from 'styled-components';
import Roster from './Roster'

import AjaxAdapter from './AjaxAdapter';

const User = AjaxAdapter('/api/users')

const Container = styled.div`
display: flex;
justify-content: center;
`;

class App extends React.Component {

  constructor(props){
  super(props);
  this.state = {
    userId: 1,
    user: null,
  }
  this.getUser = this.getUser.bind(this);
  this.getUser(this.state.userId);
}

  async componentDidMount(){
    // await this.getUser(this.state.userId);
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
    <Container>
      <Roster getUser={this.getUser} user={this.state.user}/>
    </Container>
  )
  }
}

export default App;
