import React from 'react';
import styled from 'styled-components';
import Team from './Team'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width:70%;
`;

const TeamList = styled.div`
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
          <TeamList>
            {this.props.teams.map((team,index) => (
            <Team
            handleClick={this.props.handleClick}
            key={team.id} index={index} team={team}
            />
          ))}
          </TeamList>
      </Container>
    )
  }
}

// droppable components take a function so they don't create DOM elements
