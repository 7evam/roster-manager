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
    ...props,
    isLoaded: false,
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
  this.fillSlots = this.fillSlots.bind(this);
  }

  async componentDidMount(){
    if(this.state.user){
      this.state.user.teams.forEach(
        team => team.selected = false
      )
      await this.fillSlots(this.state.user);
    }
    this.setState({
      isLoaded: true
    })
  }



 fillSlots(user){
   let nfl = user.teams.find(team => {return team.slot === 'NFL'})
   let mlb = user.teams.find(team => {return team.slot === 'MLB'})
   let nhl = user.teams.find(team => {return team.slot === 'NHL'})
   let nba = user.teams.find(team => {return team.slot === 'NBA'})
   let flex = user.teams.find(team => {return team.slot === 'FLEX'})
   let bench = []
   user.teams.forEach(team => {
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

 async rosterSwap(team1,team2){
   await AjaxAdapter('/api/teams/swap').rosterSwap(team1,team2)
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

  async handleClick(clickedTeam){
    let newState = this.state
    let team1 = clickedTeam
    let team2 = newState.selectedTeam
    if(newState.selectedTeam===null){
      newState.selectedTeam = clickedTeam
      newState.user.teams.find(team => {return team.id === clickedTeam.id}).selected = true
    } else {
      // check if swap is valid
      const checkIfValid = () => {
        let team1valid = false
        let team2valid = false
        if(
          team1.league.name === team2.slot ||
          team2.slot === 'FLEX' ||
          team2.slot === 'null'
        ){
            team1valid = true
          }
        if(
          team2.league.name === team1.slot ||
          team1.slot === 'FLEX' ||
          team1.slot === 'null'
        ){
            team2valid = true
          }
        return team1valid && team2valid
      }
      if(checkIfValid()){
        //newState.teams.find(team => {return team.id === newState.selectedTeam.id}).selected = false
        // let temp = clickedTeam.slot
        // clickedTeam.slot = newState.selectedTeam.slot
        // newState.selectedTeam.slot = temp
        // let swap1, swap2
        // newState.teams.forEach((team,index) => {
        //   if(team.id === clickedTeam.id) swap1 = index
        //   if(team.id === newState.selectedTeam.id) swap2 = index
        // })
        // newState.teams.splice(swap1,1,newState.selectedTeam)
        // newState.teams.splice(swap2,1,clickedTeam)

        // swap slots on the team object
        // send to db (send success message if db update 200s)
        await this.rosterSwap(team1,team2)
        await this.props.getUser(this.state.userId)
        await this.setState({
          user: this.props.user
        })
        this.fillSlots(this.state.user)
      } else {
        this.handleError('that roster move is not acceptable')
      }
      newState.user.teams.find(team => {return team.id === newState.selectedTeam.id}).selected = false
      this.setState({
        selectedTeam: null
      })
    }
    this.setState({
      teams: newState.teams,
    })

  }

  render(){
    const {isLoaded} = this.state
    return(
      <div>
      {isLoaded ? (
          <Container>
            <h1>Evan's roster</h1>
            <Slot slot = 'MLB' team={this.state.mlb} handleClick={this.handleClick}/>
            <Slot slot = 'NFL' team={this.state.nfl} handleClick={this.handleClick}/>
            <Slot slot = 'NHL' team={this.state.nhl} handleClick={this.handleClick}/>
            <Slot slot = 'NBA' team={this.state.nba} handleClick={this.handleClick}/>
            <Slot slot = 'FLEX' team={this.state.flex} handleClick={this.handleClick}/>
            {this.state.bench.map((team,index) => (
              <Slot slot = 'BENCH' key={`bench-${index}`} team={team} handleClick={this.handleClick} />
            ))}
            <FlashMessage error={this.state.error}/>
          </Container>
      ) : (
        <div>loading...</div>
      )}
      </div>

  )
  }
}
export default Roster;
