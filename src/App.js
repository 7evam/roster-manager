import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'

class App extends React.Component {
  state = data
  render(){
    return this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const teams = column.teamIds.map(teamId => this.state.teams[teamId]);
      return <Column key={column.id} column={column} teams={teams} />
    })
  }
}

export default App;
