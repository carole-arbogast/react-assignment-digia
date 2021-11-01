import faker from "faker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { yupResolver } from "@hookform/resolvers/yup";

import { PARTICIPANT_FORM_SCHEMA, TABLE_INFO_CELLS } from "../config";
import { Button } from "../layouts/buttons";
import { Input, ValidationErrorMessage } from "../layouts/forms";

interface Props {
  onAddParticipant: Function;
}

export function AddParticipant(props: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PARTICIPANT_FORM_SCHEMA),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { onAddParticipant } = props;

  const [success, setSuccess] = useState(false);

  const onSubmit = (data: Omit<Participant, "id">) => {
    onAddParticipant({ ...data, id: faker.datatype.uuid() });
    setSuccess(true);
    reset();
  };

  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => setSuccess(false), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexWrapper>
        {TABLE_INFO_CELLS.map((cell) => (
          <TableCell
            width={cell.width}
            noBottomPadding={Boolean(errors[cell.fieldName])}
            key={cell.fieldName}
          >
            <Input
              {...register(cell.fieldName, { required: true })}
              placeholder={cell.placeHolder}
              type={cell.type}
              aria-required
              aria-invalid={Boolean(errors[cell.fieldName])}
              data-cy={`add-participant-${cell.fieldName}`}
            ></Input>
            {errors[cell.fieldName] && (
              <ValidationErrorMessage
                role="alert"
                data-cy={`validation-error-${cell.fieldName}`}
              >
                {errors[cell.fieldName].message}{" "}
              </ValidationErrorMessage>
            )}
          </TableCell>
        ))}

        <TableCell width={"25%"}>
          <StyledButton data-cy="add-participant-btn" type="submit" inverted>
            Add new
          </StyledButton>
        </TableCell>
      </FlexWrapper>
      {success && (
        <SuccessText data-cy="success-text">
          Participant successfully created
        </SuccessText>
      )}
    </form>
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

const TableCell = styled.div<{ width: string; noBottomPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 1rem 0 1rem 1rem;
  width: ${(props) => props.width};
  padding-bottom: ${(props) => props.noBottomPadding && "0"};

  &:last-child {
    padding: 1rem;
  }
`;

const StyledButton = styled(Button)`
  color: #757575;
  align-self: flex-end;
  padding: 0 1.5rem;
`;

const SuccessText = styled.p`
  color: green;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0 0 0.75rem 0;
`;

export default AddParticipant;
