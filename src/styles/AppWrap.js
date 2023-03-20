import styled from "styled-components";

export const AppWrap = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
