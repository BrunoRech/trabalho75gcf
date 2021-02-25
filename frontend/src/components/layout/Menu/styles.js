import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const MenuContainer = styled.div`
  width: 150px;
  height: 100vh;
  background-color: #000;
`;

export const Link = styled(RouterLink)`
  color: white;
  font-size: 25px;
  font-weight: bolder;
  padding: 10px;
  :hover {
    color: #cccc;
  }
`;
