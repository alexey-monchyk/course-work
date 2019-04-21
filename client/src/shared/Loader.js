import React from 'react'
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 100px;
  display: block;
  margin: 40vh auto;
`;

export default () => (
  <LoaderContainer>
    <SyncLoader
      sizeUnit={"px"}
      size={20}
      color={'#3f51b5'}
      loading={true}
    />
  </LoaderContainer>);