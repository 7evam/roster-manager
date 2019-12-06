import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${
    props =>
    props.selectedTeam &&
    props.selectedTeam.id === props.team.id  ?
    "#C8F39C" :
    "white"
  };;
`

const EmptyContainer = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: ${
    props =>
    props.selectedTeam &&
    props.selectedTeam === props.slot ?
    "#C8F39C" :
    "white"
  };;
`

const shouldRenderButton = (team,slot,selectedTeam) => {
  if(selectedTeam === null) return true
  if(typeof selectedTeam === "string"){
    if(!team) return false
    if(selectedTeam==="FLEX") return true
    if(team){
      if(selectedTeam === team.league.name) return true
    }
    return false
  } else {
    // selectedTeam is object
    if(team){
      if(selectedTeam.slot==="null" && team.slot==="null") return false
      if(team.league.name === selectedTeam.league.name){
        return true
      }
    } else {
        if(selectedTeam.league.name === slot || slot === "FLEX") return true
        return false
    }
  }
}

function Slot({ team, slot, handleClick, selectedTeam }){
    return (
      <div>
      {team ? (
        <Container selectedTeam={selectedTeam} team={team}>
        {slot} - {team.name}
        {
        shouldRenderButton(team,slot,selectedTeam) ?
        <button onClick={() => handleClick(team)}>Select</button> :
        null
        }
        </Container>
      ) : (
        <EmptyContainer selectedTeam={selectedTeam} slot={slot}>
        <b>EMPTY</b> {slot} slot
        {
        shouldRenderButton(team,slot,selectedTeam) ?
        <button onClick={() => handleClick(slot)}>Fill</button> :
        null
        }
        </EmptyContainer>
        )}
      </div>
    );
}

export default Slot;

// {poop(true) ?
//   <div>Yes poop</div> :
//   <div> no poop </div>
// }
