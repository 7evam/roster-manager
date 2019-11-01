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
    newState.teams.forEach(
      team => team.selected = false
    )
    newState.selectedTeam = null
    this.setState(newState)
  }

  handleClick(clickedTeam){
    let newState = this.state
    if(newState.selectedTeam===null){
      newState.selectedTeam = clickedTeam
      newState.teams.find(team => {return team.id === clickedTeam.id}).selected = true
    } else {
      newState.teams.find(team => {return team.id === newState.selectedTeam.id}).selected = false
      let temp = clickedTeam.slot
      clickedTeam.slot = newState.selectedTeam.slot
      newState.selectedTeam.slot = temp
      let swap1, swap2
      newState.teams.forEach((team,index) => {
        if(team.id === clickedTeam.id) swap1 = index
        if(team.id === newState.selectedTeam.id) swap2 = index
      })
      newState.teams.splice(swap1,1,newState.selectedTeam)
      newState.teams.splice(swap2,1,clickedTeam)
      newState.selectedTeam = null
    }


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
        <Slot slot = 'MLB' team={mlb} handleClick={this.handleClick}/>
        <Slot slot = 'NFL' team={nfl} handleClick={this.handleClick}/>
        <Slot slot = 'NHL' team={nhl} handleClick={this.handleClick}/>
        <Slot slot = 'NBA' team={nba} handleClick={this.handleClick}/>
        <Slot slot = 'FLEX' team={flex} handleClick={this.handleClick}/>
        {bench.map((team,index) => (
          <Slot slot = 'BENCH' team={team} handleClick={this.handleClick} />
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
