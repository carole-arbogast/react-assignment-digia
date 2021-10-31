import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { tableInfoCells } from "../config";
import { Button, IconButton } from "../layouts/buttons";
import { TableRowCell } from "../layouts/table";
import TableCell from "./TableCell";

interface Props {
  participant: Participant;
  index: number;
  onEdit: (participantId: string | null) => void;
  isEditing?: boolean;
  onDelete: (index: number) => void;
}

export function TableRow(props: Props) {
  const { reset } = useFormContext();

  const { participant, index, onEdit, isEditing, onDelete } = props;

  return (
    <>
      <tr>
        {tableInfoCells.map((cell) => (
          <TableCell
            key={cell.fieldName}
            index={index}
            isEditing={isEditing}
            onEdit={() => onEdit(participant.id)}
            fieldInfo={{
              name: cell.fieldName,
              placeHolder: cell.placeHolder,
              type: cell.type,
            }}
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

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: #909090;
  font-size: 1.5rem;
`;

export default TableRow;
