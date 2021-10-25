import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Participant {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface Props {
  participant: Participant;
}

export function TableRow(props: Props) {
  const { participant } = props;

  const [isEditing, setIsEditing] = useState<boolean>();

  return isEditing ? (
    <tr>
      <TableRowCell padding="1rem">
        <Input placeholder={"Full name"} />
      </TableRowCell>
      <TableRowCell padding="1rem">
        <Input placeholder={"E-mail address"} />
      </TableRowCell>
      <TableRowCell padding="1rem">
        <Input placeholder={"Phone number"} />
      </TableRowCell>
      <TableRowCell padding="1rem">
        <FlexWrapper>
          <Button inverted onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button>Save</Button>
        </FlexWrapper>
      </TableRowCell>
    </tr>
  ) : (
    <tr>
      <TableRowCell>{participant.name}</TableRowCell>
      <TableRowCell>{participant.email.toLowerCase()}</TableRowCell>
      <TableRowCell>{participant.phoneNumber}</TableRowCell>
      <TableRowCell colSpan={2}>
        <FlexWrapper>
          <IconButton onClick={() => setIsEditing(true)}>
            <StyledIcon icon={faPen} />
          </IconButton>
          <IconButton>
            <StyledIcon icon={faTrash} />
          </IconButton>
        </FlexWrapper>
      </TableRowCell>
    </tr>
  );
}

// TODO extract components that are reused elsewhere

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TableRowCell = styled.td<{ padding?: string }>`
  border-bottom: 1px solid #f1f1f1;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: ${(props) => `${props.padding || "1.5rem"} 0.5rem`};
  word-break: break-word;

  &:first-child {
    padding-left: ${(props) => props.padding || "1.5rem"};
  }

  &:last-child {
    padding-right: ${(props) => props.padding || "1.5rem"};
  }
`;

const IconButton = styled.button`
  border: none;
  background: transparent;
  margin: 0 0.75rem;
  cursor: pointer;
  height: 1.5rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #909090;
  font-size: 1.5rem;
`;

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

export default TableRow;
