import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import data from './data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'

class TeamList extends React.Component {

  state = data

  onDragEnd = result => {
      const { destination, source, draggableId } = result;

      // if user drops item in non droppable place
      if(!destination) {
        return
      }

      // if user drops item in same place
      if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }
      const column = this.state.columns[source.droppableId];
      // don't mutate existing state, create new state
      let newTeamIds = Array.from(column.teamIds)
      newTeamIds.splice(source.index, 1)
      newTeamIds.splice(destination.index,0,draggableId)

      const newColumn = {
        ...column,
        teamIds: newTeamIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      this.setState(newState)
  }

  render(){
    return(
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      {this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const teams = column.teamIds.map(teamId => this.state.teams[teamId]);
      return <Column key={column.id} column={column} teams={teams} />
    })
  }
    </DragDropContext>
  );
  }
}

export default TeamList;
