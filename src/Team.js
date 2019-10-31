import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
`;

export default class Team extends React.Component {
  render() {
    return (
      <Container>{this.props.team.name}</Container>
    )
  }
}
