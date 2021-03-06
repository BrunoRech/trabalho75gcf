import styled from "styled-components";
import { Modal as modal, Button as SemButton } from "semantic-ui-react";

export const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

export const SmallModal = styled(modal)`
  width: 415px !important;
`;

export const Modal = styled(modal)`
  width: 500px !important;
`;

export const TableButton = styled(SemButton)`
  background: transparent !important;
`;

