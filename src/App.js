import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import TeamList from './TeamList'
import LeagueList from './LeagueList'
import styled from 'styled-components';
import Roster from './Roster'

import AjaxAdapter from './AjaxAdapter';

const Users = AjaxAdapter('/api/users')
const Teams = AjaxAdapter('/api/teams')

const Container = styled.div`
display: flex;
justify-content: center;
`;

class App extends React.Component {

  constructor(props){
  super(props);
  this.state = {
    teams: [],
    userId: 1,
  }
  this.getData = this.getData.bind(this);

}

  componentDidMount(){
    this.getData();
  }

  async getData() {
   this.setState({
     users: await Users.read(),
     teams: await Teams.read()
   });
 }

  render(){
    return(
    <Container>
      <Roster teams={this.state.teams}/>
    </Container>
  )
  }
}

export default App;
