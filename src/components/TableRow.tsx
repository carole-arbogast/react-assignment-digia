import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableCell from "./TableCell";

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  participant: Participant;
  index: number;
  onEdit: (participantId: string | null) => void;
  isEditing?: boolean;
  onDelete: (index: number) => void;
}

const tableCells = [
  {
    fieldName: "name",
    placeHolder: "Full Name",
  },
  {
    fieldName: "email",
    placeHolder: "E-mail address",
  },
  {
    fieldName: "phone",
    placeHolder: "Phone number",
  },
];

export function TableRow(props: Props) {
  const { reset } = useFormContext();

  const { participant, index, onEdit, isEditing, onDelete } = props;

  return (
    <>
      <tr>
        {tableCells.map((cell) => (
          <TableCell
            key={cell.fieldName}
            index={index}
            fieldName={cell.fieldName}
            placeHolder={cell.placeHolder}
            isEditing={isEditing}
            onEdit={() => onEdit(participant.id)}
          ></TableCell>
        ))}

        {isEditing ? (
          <TableRowCell smallPadding>
            <FlexWrapper>
              <Button
                inverted
                onClick={() => {
                  reset();
                  onEdit(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </FlexWrapper>
          </TableRowCell>
        ) : (
          <>
            <TableRowCell colSpan={2}>
              <FlexWrapper>
                <IconButton onClick={() => onEdit(participant.id)}>
                  <StyledIcon icon={faPen} />
                </IconButton>
                <IconButton onClick={() => onDelete(index)}>
                  <StyledIcon icon={faTrash} />
                </IconButton>
              </FlexWrapper>
            </TableRowCell>
          </>
        )}
      </tr>
    </>
  );
}

// TODO extract components that are reused elsewhere

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface TableRowCellProps {
  smallPadding?: boolean;
  noBottomPadding?: boolean;
}

export const TableRowCell = styled.td<TableRowCellProps>`
  border-bottom: 1px solid #f1f1f1;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: ${(props) => `${props.smallPadding ? "1rem" : "1.5rem"} 0.5rem`};
  word-break: break-word;
  padding-bottom: ${(props) => props.noBottomPadding && "0"};

  &:first-child {
    padding-left: ${(props) => (props.smallPadding ? "1rem" : "1.5rem")};
  }

  &:last-child {
    padding-right: ${(props) => (props.smallPadding ? "1rem" : "1.5rem")};
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
