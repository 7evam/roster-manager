import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
`

function Slot({ team, slot }){
    return (
        <Container team={team}>
        {slot}
        {team.name}
        </Container>
    );
}

export default Slot;

//   background-color: ${props => !!props.team.selected ? "green" : "white"}
