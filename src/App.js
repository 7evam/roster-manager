import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import TeamList from './TeamList'
import LeagueList from './LeagueList'
import styled from 'styled-components';
import Roster from './Roster'


const Container = styled.div`
display: flex;
justify-content: center;
`;

class App extends React.Component {

  render(){
    return(
    <Container>
      <Roster/>
    </Container>
  )
  }
}

export default App;
