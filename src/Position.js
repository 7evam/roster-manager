import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  background-color: white;
`;

export default class Position extends React.Component {
  render() {
    return (
      <Container>{this.props.name}</Container>
    );
  }
}
