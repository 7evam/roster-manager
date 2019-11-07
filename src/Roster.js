import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'
import Team from './Team'
import Slot from './Slot'
import FlashMessage from './FlashMessage'
import styled from 'styled-components';

import AjaxAdapter from './AjaxAdapter';

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width:60%;
`;

class Roster extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    userId: 1,
    error: null,
    selectedTeam: null,
    mlb: {},
    nfl: {},
    nhl: {},
    nba: {},
    flex: {},
    bench: [],
  }
  this.handleClick = this.handleClick.bind(this)
  this.handleError = this.handleError.bind(this)
  this.getData = this.getData.bind(this);
  this.fillSlots = this.fillSlots.bind(this);
  }

  async componentDidMount(){
    await this.getData();
    this.state.teams.forEach(
      team => team.selected = false
    )
    await this.fillSlots();
  }

  async getData() {
  const Teams = AjaxAdapter(`/api/teams/${this.state.userId}`)
  const Users = AjaxAdapter('/api/users')
   this.setState({
     teams: await Teams.read()
   });
 }

 fillSlots(){
   let nfl = this.state.teams.find(team => {return team.slot === 'NFL'})
   let mlb = this.state.teams.find(team => {return team.slot === 'MLB'})
   let nhl = this.state.teams.find(team => {return team.slot === 'NHL'})
   let nba = this.state.teams.find(team => {return team.slot === 'NBA'})
   let flex = this.state.teams.find(team => {return team.slot === 'FLEX'})
   let bench = []
   this.state.teams.forEach(team => {
     console.log(team)
     if(team.slot==="null"){
       bench.push(team)
     }
   })
   this.setState({
     nfl,
     mlb,
     nhl,
     nba,
     flex,
     bench
   })

 }

  handleError(err){
    console.log('in the handleError')
    this.setState({
      error: err
    })
    setTimeout(() => {
      console.log('in the set timeout')
      this.setState({
        error: null
      })
    }, 3000);
  }

  handleClick(clickedTeam){
    let newState = this.state
    if(newState.selectedTeam===null){
      console.log('selected team null')
      newState.selectedTeam = clickedTeam
      newState.teams.find(team => {return team.id === clickedTeam.id}).selected = true
    } else {
      // check if swap is valid
      const checkIfValid = () => {
        let team1 = clickedTeam
        let team2 = newState.selectedTeam
        let team1valid = false
        let team2valid = false
        if(team1.league === team2.slot ||
          team2.slot === 'FLEX' ||
          team2.slot === null
        ){team1valid = true}
        if(team2.league === team1.slot ||
        team1.slot === 'FLEX' ||
        team1.slot === null){team2valid = true}
        return team1valid && team2valid
      }
      if(checkIfValid()){
        //newState.teams.find(team => {return team.id === newState.selectedTeam.id}).selected = false
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
      } else {
        this.handleError('that roster move is not acceptable')
      }
      newState.teams.find(team => {return team.id === newState.selectedTeam.id}).selected = false
      newState.selectedTeam = null
    }
    this.setState({
      teams: newState.teams
    })

  }

  render(){
    return(
    <Container>
        <h1>Evan's roster</h1>
        <Slot slot = 'MLB' team={this.state.mlb} handleClick={this.handleClick}/>
        <Slot slot = 'NFL' team={this.state.nfl} handleClick={this.handleClick}/>
        <Slot slot = 'NHL' team={this.state.nhl} handleClick={this.handleClick}/>
        <Slot slot = 'NBA' team={this.state.nba} handleClick={this.handleClick}/>
        <Slot slot = 'FLEX' team={this.state.flex} handleClick={this.handleClick}/>
        {this.state.bench.map((team,index) => (
          <Slot slot = 'BENCH' team={team} handleClick={this.handleClick} />
        ))}
        <FlashMessage error={this.state.error}/>
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
