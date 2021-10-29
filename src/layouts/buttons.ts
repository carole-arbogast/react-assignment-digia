import styled from "styled-components";

export const Button = styled.button<{ inverted?: boolean }>`
  height: 2.5rem;
  padding: 0 0.75rem;
  background: ${(props) => (props.inverted ? "#EDEDED" : "#07f")};
  color: ${(props) => (props.inverted ? "#07f" : "#ffffff")};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  font-family: inherit;
  cursor: pointer;
  margin-right: 0.5rem;

  &:last-child {
    margin-right: 0;
  }
`;

export const IconButton = styled.button`
  border: none;
  background: transparent;
  margin: 0 0.75rem;
  cursor: pointer;
  height: 1.5rem;
`;
