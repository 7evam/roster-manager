import React from 'react';
import styled from 'styled-components';
import Team from './Team'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width:70%;
`;
// const Title = styled.h3`
//   padding: 8px;
// `;
const TeamList = styled.div`
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Droppable droppableId={this.props.column.id}>
        {(provided) => (
          <TeamList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.props.teams.map((team,index) => (
            <Team key={team.id} index={index} team={team}/>
          ))}
            {provided.placeholder}
          </TeamList>
        )}
        </Droppable>
      </Container>
    )
  }
}

// droppable components take a function so they don't create DOM elements
