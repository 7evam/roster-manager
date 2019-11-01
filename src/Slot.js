import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${props => !!props.team.selected ? "green" : "white"};
`

function Slot({ team, slot, handleClick }){
    return (
        <Container team={team}>
        {slot} - {team.name}
        <button onClick={() => handleClick(team)}>Select</button>
        </Container>
    );
}

export default Slot;
