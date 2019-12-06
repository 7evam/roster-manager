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
  this.checkIfValid = this.checkIfValid.bind(this);
  this.rosterSwap = this.rosterSwap.bind(this);
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

  checkIfValid(team1,team2){
    // return object with
    // validSwap: bool
    // error: bool
    // message: string
    let result = {
      validSwap: false,
      error: false,
      message: null
    }
    // if same button is clicked
    if(team1 === team2){
      this.setState({
        selectedTeam: null
      })
      return result
    }

  }

  async handleClick(clickedTeam){
    let newState = this.state
    if(newState.selectedTeam===null){
      newState.selectedTeam = clickedTeam
      this.setState({
        selectedTeam: newState.selectedTeam
      })
    } else {
      let team1 = clickedTeam
      let team2 = newState.selectedTeam
      let isValid = this.checkIfValid(team1,team2);
      if(isValid.validSwap===true){
        this.rosterSwap()
      } else {
        if(isValid.error) this.handleError(isValid.message)
      }
    }

  }

  render(){
    const {isLoaded} = this.state
    return(
      <div>
      {isLoaded ? (
          <Container>
            <h1>Evan's roster</h1>
            <Slot slot = 'MLB' selectedTeam={this.state.selectedTeam}team={this.state.mlb} handleClick={this.handleClick}/>
            <Slot slot = 'NFL' selectedTeam={this.state.selectedTeam}team={this.state.nfl} handleClick={this.handleClick}/>
            <Slot slot = 'NHL' selectedTeam={this.state.selectedTeam}team={this.state.nhl} handleClick={this.handleClick}/>
            <Slot slot = 'NBA' selectedTeam={this.state.selectedTeam}team={this.state.nba} handleClick={this.handleClick}/>
            <Slot slot = 'FLEX' selectedTeam={this.state.selectedTeam}team={this.state.flex} handleClick={this.handleClick}/>
            {this.state.bench.map((team,index) => (
              <Slot slot = 'BENCH' key={`bench-${index}`} selectedTeam={this.state.selectedTeam} team={team} handleClick={this.handleClick} />
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
