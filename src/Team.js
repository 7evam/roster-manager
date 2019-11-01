import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${props => !!props.team.selected ? "green" : "white"}
`

function Team({ team, handleClick }){
    return (
        <Container team={team}>
        {team.name}
        <button onClick={() => handleClick(team)}>Select</button>
        </Container>
    );
}

export default Team;

// draggable components require a unique ID and an index
// index comes from second arg in a map function
// draggable components also expect a function as a child

// style={ this.props.team.selected ? {backgroundColor: 'green'} : {backgroundColor: 'white'} }

// background-color: ${props => !!props.team.selected ? "green" : "white"};

//
