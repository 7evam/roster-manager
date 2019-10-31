import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: white;
`;

export default class Team extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.team.id} index={this.props.index}>
      {(provided)=>(
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
        {this.props.team.name}
        </Container>
      )}
      </Draggable>
    );
  }
}

// draggable components require a unique ID and an index
// index comes from second arg in a map function
// draggable components also expect a function as a child
