import { useFormContext } from "react-hook-form";

import { Input, ValidationErrorMessage } from "../layouts/forms";
import { TableRowCell } from "../layouts/table";

interface Props {
  index: number;
  isEditing?: boolean;
  onEdit: () => void;
  fieldInfo: {
    name: string;
    placeHolder: string;
    type: string;
  };
}

export function TableCell(props: Props) {
  const { index, isEditing, onEdit, fieldInfo } = props;

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const error =
    errors.participants && errors.participants[index]?.[fieldInfo.name];

  return isEditing ? (
    <TableRowCell smallPadding noBottomPadding={Boolean(error)}>
      <Input
        {...register(`participants.${index}.${fieldInfo.name}`, {
          required: true,
        })}
        placeholder={fieldInfo.placeHolder}
        type={fieldInfo.type}
        aria-required={true}
        aria-invalid={Boolean(error)}
      />
      {error && (
        <ValidationErrorMessage role="alert">
          {error.message}
        </ValidationErrorMessage>
      )}
    </TableRowCell>
  ) : (
    <TableRowCell onClick={() => onEdit()}>
      {watch(`participants.${index}.${fieldInfo.name}`)}
    </TableRowCell>
  );
}

export default TableCell;
