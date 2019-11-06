import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import TeamList from './TeamList'
import LeagueList from './LeagueList'
import styled from 'styled-components';
import Roster from './Roster'

import AjaxAdapter from './AjaxAdapter';

const Users = AjaxAdapter('/api/users')

const Container = styled.div`
display: flex;
justify-content: center;
`;

class App extends React.Component {

  constructor(props){
  super(props);
  this.state = {
    users: [],
  }
  this.getData = this.getData.bind(this);

}

  componentDidMount(){
    this.getData();
  }

  async getData() {
   this.setState({
     users: await Users.read(),
   });
 }

  render(){
    return(
    <Container>
      <div>
        {this.state.users.map(user => (
          <span>{user.name}</span>
        ))}
      </div>
      <Roster/>
    </Container>
  )
  }
}

export default App;
