import faker from "faker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { yupResolver } from "@hookform/resolvers/yup";

import { PARTICIPANT_FORM_SCHEMA, tableInfoCells } from "../config";
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
  });

  const { onAddParticipant } = props;

  const [success, setSuccess] = useState(false);

  const onSubmit = (data: Omit<Participant, "id">) => {
    onAddParticipant({ ...data, id: faker.datatype.uuid() });
    setSuccess(true);
    reset();
  };

  useEffect(() => {
    let timer = setTimeout(() => setSuccess(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexWrapper>
        {tableInfoCells.map((cell) => (
          <Item
            width={cell.width}
            noBottomPadding={Boolean(errors[cell.fieldName])}
          >
            <Input
              {...register(cell.fieldName, { required: true })}
              placeholder={cell.placeHolder}
              type={cell.type}
              aria-required
              aria-invalid={Boolean(errors[cell.fieldName])}
            ></Input>
            {errors[cell.fieldName] && (
              <ValidationErrorMessage role="alert">
                {errors[cell.fieldName].message}{" "}
              </ValidationErrorMessage>
            )}
          </Item>
        ))}

        <Item width={"25%"}>
          <StyledButton type="submit" inverted>
            Add new
          </StyledButton>
        </Item>
      </FlexWrapper>
      {success && <SuccessText>Participant successfully created</SuccessText>}
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

const Item = styled.div<{ width: string; noBottomPadding?: boolean }>`
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
