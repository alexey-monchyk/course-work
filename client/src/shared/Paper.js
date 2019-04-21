import React from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';

const CustomPaper = styled(Paper)`
  padding: 20px;
  margin: 10px;
  background-color: #2196f3 !important;
`;

export default (props) => <CustomPaper>{props.children}</CustomPaper>;
