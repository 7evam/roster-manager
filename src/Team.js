import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: white;
`;

export default class Team extends React.Component {
  render() {
    return (
        <Container>
        {this.props.team.name}
        </Container>
    );
  }
}

// draggable components require a unique ID and an index
// index comes from second arg in a map function
// draggable components also expect a function as a child
