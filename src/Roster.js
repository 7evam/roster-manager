import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'
import Team from './Team'
import Slot from './Slot'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width:60%;
`;

class Roster extends React.Component {
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
    let nfl = this.state.teams.find(team => {return team.slot === 'NFL'})
    let mlb = this.state.teams.find(team => {return team.slot === 'MLB'})
    let nhl = this.state.teams.find(team => {return team.slot === 'NHL'})
    let nba = this.state.teams.find(team => {return team.slot === 'NBA'})
    let flex = this.state.teams.find(team => {return team.slot === 'FLEX'})
    let bench = []
    this.state.teams.forEach(team => {
      if(!team.slot){
        bench.push(team)
      }
    })

    return(
    <Container>
        <Slot slot = 'MLB' team={mlb}/>
        <Slot slot = 'NFL' team={nfl}/>
        <Slot slot = 'NHL' team={nhl}/>
        <Slot slot = 'NBA' team={nba}/>
        <Slot slot = 'FLEX' team={flex}/>
        {bench.map((team,index) => (
          <Slot slot = 'BENCH' team={team} />
        ))}
    </Container>
  )
  }
}
export default Roster;

// {this.state.teams.map((team,index) => (
//   <Team
//       handleClick={this.handleClick}
//       team={team}
//   />
// ))}
