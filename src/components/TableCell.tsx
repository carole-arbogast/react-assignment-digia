import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface Props {
  index: number;
  fieldName: string;
  placeHolder: string;
  isEditing?: boolean;
  onEdit: () => void;
}

export function TableCell(props: Props) {
  const { index, fieldName, placeHolder, isEditing, onEdit } = props;

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const error = errors.participants && errors.participants[index]?.[fieldName];

  return isEditing ? (
    <TableRowCell smallPadding noBottomPadding={Boolean(error)}>
      <Input
        {...register(`participants.${index}.${fieldName}`, { required: true })}
        placeholder={placeHolder}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </TableRowCell>
  ) : (
    <TableRowCell onClick={() => onEdit()}>
      {watch(`participants.${index}.${fieldName}`)}
    </TableRowCell>
  );
}

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

const ErrorMessage = styled.p`
  margin: 0;
  color: red;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
`;

export default TableCell;
