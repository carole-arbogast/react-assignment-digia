import { useFormContext } from "react-hook-form";

import { Input, ValidationErrorMessage } from "../layouts/forms";
import { TableRowCell } from "../layouts/table";

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
      {error && (
        <ValidationErrorMessage>{error.message}</ValidationErrorMessage>
      )}
    </TableRowCell>
  ) : (
    <TableRowCell onClick={() => onEdit()}>
      {watch(`participants.${index}.${fieldName}`)}
    </TableRowCell>
  );
}

export default TableCell;
