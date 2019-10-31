import React from 'react';
import styled from 'styled-components';
import Team from './Team'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TeamList = styled.div`
  padding: 8px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <TeamList>
          {this.props.teams.map(team => <Team key={team.id} team={team}></Team>)}
        </TeamList>
      </Container>
    )
  }
}
