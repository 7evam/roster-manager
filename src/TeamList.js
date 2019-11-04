import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'
import Team from './Team'
import FlashMessage from './FlashMessage'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width:60%;
`;

class TeamList extends React.Component {
  constructor(props){
  super(props);
  this.state = data
  this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    let newState = this.state
    // Object.keys(newState.teams).forEach(
    //   team => {newState.teams[team].selected = false}
    // )
    newState.teams.forEach(
      team => team.selected = false
    )
    newState.selectedTeam = null
    newState.error = null
    this.setState(newState)
  }

  handleClick(clickedTeam){
    let newState = this.state
    newState.teams.find(team => {return team.id === clickedTeam.id}).selected ?
    newState.teams.find(team => {return team.id === clickedTeam.id}).selected = false :
    newState.teams.find(team => {return team.id === clickedTeam.id}).selected = true

    this.setState({
      teams: newState.teams
    })

  }

  render(){
    return(
      <Container>
      <FlashMessage error={this.state.error}/>
      {this.state.teams.map((team,index) => (
        <Team
            handleClick={this.handleClick}
            team={team}
        />
      ))}
    </Container>
  )
  }
}
export default TeamList;

// return(
//   this.state.columnOrder.map(columnId => {
//   const column = this.state.columns[columnId];
//   const teams = column.teamIds.map(teamId => this.state.teams[teamId]);
//   return <Column
//   handleClick={this.handleClick} key={column.id}
//   column={column} teams={teams}
//   />
// })
// )

// return(
//   this.state.teams.map(team =>{
//     <Team

//     />
//   })
