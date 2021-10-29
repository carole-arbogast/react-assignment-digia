import styled from "styled-components";

export const Input = styled.input<{ width?: string }>`
  box-sizing: border-box;
  font-family: inherit;
  background: #f9f9f9;
  border: 1px solid #eeeeee;
  font-size: 1rem;
  height: 2.5rem;
  padding: 0 1rem;
  width: ${(props) => props.width || "100%"};
`;

export const ValidationErrorMessage = styled.p`
  margin: 0;
  color: red;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
`;
