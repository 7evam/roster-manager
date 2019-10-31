import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import TeamList from './TeamList'
import LeagueList from './LeagueList'
import styled from 'styled-components';

const Container = styled.div`
display: flex;
justify-content: center;
`;

class App extends React.Component {
  render(){
    return(
    <Container>
    <LeagueList />
    <TeamList />
    </Container>
  )
  }
}

export default App;
