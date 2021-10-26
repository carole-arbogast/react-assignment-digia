import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  participant: Participant;
  index: number;
  onEdit: Function;
  isEditing?: boolean;
  onDelete: (index: number) => void;
}

export function TableRow(props: Props) {
  const { register, watch } = useFormContext();

  const { participant, index, onEdit, isEditing, onDelete } = props;

  return isEditing ? (
    <tr>
      <TableRowCell padding="1rem">
        <Input
          {...register(`participants.${index}.name`)}
          placeholder={"Full name"}
        />
      </TableRowCell>
      <TableRowCell padding="1rem">
        <Input
          {...register(`participants.${index}.email`)}
          placeholder={"E-mail address"}
        />
      </TableRowCell>
      <TableRowCell padding="1rem">
        <Input
          {...register(`participants.${index}.phone`)}
          placeholder={"Phone number"}
        />
      </TableRowCell>
      <TableRowCell padding="1rem">
        <FlexWrapper>
          <Button inverted onClick={() => onEdit(null)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </FlexWrapper>
      </TableRowCell>
    </tr>
  ) : (
    <tr>
      <TableRowCell>{watch(`participants.${index}.name`)}</TableRowCell>
      <TableRowCell>
        {watch(`participants.${index}.email`).toLowerCase()}
      </TableRowCell>
      <TableRowCell>{watch(`participants.${index}.phone`)}</TableRowCell>
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
