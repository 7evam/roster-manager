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
   console.log(`filling slots for ${user.name}`)
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
   console.log('mlb')
   console.log(mlb)
   console.log('mlb')
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
   if(typeof team1 === "string"){
     // team 1 is a slot
    try{
      await AjaxAdapter('/api/teams/fill').rosterFill(team1,team2)
      await this.props.getUser(this.state.user.id)
      await this.setState({
        user: this.props.user
      })
      await this.fillSlots(this.state.user)
      this.handleError('success')
    } catch(err){
      console.error(err)
    }
   } else if(typeof team2 === "string"){
     // team 2 is a slot
     try{
       await AjaxAdapter('/api/teams/fill').rosterFill(team2,team1)
       await this.props.getUser(this.state.user.id)
       await this.setState({
         user: this.props.user
       })
       await this.fillSlots(this.state.user)
       this.handleError('success')
     } catch(err){
       console.error(err)
     }
   } else {
     // both are actual teams
     try{
       await AjaxAdapter('/api/teams/swap').rosterSwap(team1,team2)
       await this.props.getUser(this.state.user.id)
       this.setState({
         user: this.props.user
       })
       await this.fillSlots(this.state.user)
       this.handleError('success')
     } catch(err){
       console.error(err)
     }

   }

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
    // might need to have some double checks here later
    return true
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
      if(isValid===true){
        await this.rosterSwap(team1,team2)
      } else {
        this.handleError(isValid)
      }
      this.setState({
        selectedTeam: null
      })
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
