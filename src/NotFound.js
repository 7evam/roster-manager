import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
`;

const NotFound = () => {

    return (
        <Container>
          <p>that doesn't exist</p>
        </Container>
    )
}

export default NotFound;
