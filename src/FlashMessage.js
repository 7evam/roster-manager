import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  padding: 8px;
  background-color: red;
  visibility: ${props => !!props.error ? "visible" : "hidden"}
`;

const FlashMessage = ({error}) => {

    // let [visibility, setVisibility] = useState(false);
    // let [message, setMessage] = useState('');
    // let [type, setType] = useState('');

    return (
        error ?
        <Container error={error}>
          <p>{error}</p>
        </Container> : null
    )
}

export default FlashMessage;
