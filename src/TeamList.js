import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'

class TeamList extends React.Component {
  constructor(props){
  super(props);
  this.state = data
  this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    let newState = this.state
    Object.keys(newState.teams).forEach(
      team => {newState.teams[team].selected = false}
    )
    newState.selectedTeam = null
    this.setState(newState)
  }

  handleClick(team){
    let newState = this.state
    
      newState.teams[team.id].selected ?
      newState.teams[team.id].selected = false :
      newState.teams[team.id].selected = true

    this.setState({
      teams: newState.teams
    })

  }

  render(){
    return(
      this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const teams = column.teamIds.map(teamId => this.state.teams[teamId]);
      return <Column
      handleClick={this.handleClick} key={column.id}
      column={column} teams={teams}
      />
    })
  )
}
}
export default TeamList;
