import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${props => !!props.team.selected ? "#C8F39C" : "white"};
`

const EmptyContainer = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: white;
`

function Slot({ team, slot, handleClick }){
    return (
      <div>
      {team ? (
        <Container team={team}>
        {slot} - {team.name}
        <button onClick={() => handleClick(team)}>Select</button>
        </Container>
      ) : (
        <EmptyContainer>
        EMPTY {slot} slot
        <button onClick={() => handleClick(team)}>Select</button>
        </EmptyContainer>
        )}
      </div>
    );
}

export default Slot;
