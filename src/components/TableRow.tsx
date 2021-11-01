import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TABLE_INFO_CELLS } from "../config";
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
      <tr data-cy="participant-row">
        {TABLE_INFO_CELLS.map((cell) => (
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
          <TableRowCell smallPadding data-cy="edit-participant-form">
            <FlexWrapper>
              <Button
                type="button"
                inverted
                onClick={() => {
                  reset();
                  onEdit(null);
                }}
                data-cy="cancel-btn"
              >
                Cancel
              </Button>
              <Button type="submit" data-cy="save-btn">
                Save
              </Button>
            </FlexWrapper>
          </TableRowCell>
        ) : (
          <>
            <TableRowCell colSpan={2}>
              <FlexWrapper>
                <IconButton
                  onClick={() => onEdit(participant.id)}
                  data-cy="edit-btn"
                >
                  <StyledIcon icon={faPen} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(index)}
                  data-cy="delete-btn"
                >
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
