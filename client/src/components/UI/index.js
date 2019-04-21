import React from 'react';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';

export const Container = styled(Grid)`
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

export const CustomButton = styled((props) => <Button {...props} />)`
  display: flex;
  margin-top: 13px !important;
  padding: 13px 0px !important;
  width: 100%;
`;