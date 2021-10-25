import styled from "styled-components";
import { Button, Input } from "./TableRow";

export function AddParticipant() {
  return (
    <FlexWrapper>
      <Item width={"20%"}>
        <Input placeholder={"Full name"}></Input>
      </Item>
      <Item width={"30%"}>
        <Input placeholder={"E-mail address"}></Input>
      </Item>
      <Item width={"25%"}>
        <Input placeholder={"Phone number"}></Input>
      </Item>

      <Item width={"25%"}>
        <StyledButton inverted>Add new</StyledButton>
      </Item>
    </FlexWrapper>
  );
}

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #ffffff;
  width: 912px;
  margin-bottom: 0.75rem;
`;

const Item = styled.div<{ width: string }>`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 1rem 0 1rem 1rem;
  width: ${(props) => props.width};

  &:last-child {
    padding: 1rem;
  }
`;

const StyledButton = styled(Button)`
  color: #757575;
`;

export default AddParticipant;
