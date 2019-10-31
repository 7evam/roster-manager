import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components';
import Position from './Position'

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width:30%;
`;

const PositionName = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: white;
`;

class LeagueList extends React.Component {

  render(){
    return(
      <Container>
        <Position name='MLB'/>
        <Position name='NFL'/>
        <Position name='NHL'/>
        <Position name='NBA'/>
        <Position name='FLEX'/>
        <Position name='BENCH'/>
        <Position name='BENCH'/>
        <Position name='BENCH'/>
      </Container>
  );
  }
}

export default LeagueList;
