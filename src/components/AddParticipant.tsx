import faker from "faker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Input } from "./TableRow";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onAddParticipant: Function;
}

//FIXME this is duplicated from Table
const formSchema = yup.object({
  name: yup.string().required("This field is required."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("This field is required."),
  phone: yup.string().required("This field is required"),
});

export function AddParticipant(props: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { onAddParticipant } = props;

  const [success, setSuccess] = useState(false);

  const onSubmit = (data: FormData) => {
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
        <Item noBottomPadding={Boolean(errors.name)} width={"20%"}>
          <Input
            {...register("name", { required: true })}
            placeholder={"Full name"}
          ></Input>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Item>

        <Item noBottomPadding={Boolean(errors.email)} width={"30%"}>
          <Input {...register("email")} placeholder={"E-mail address"}></Input>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Item>
        <Item noBottomPadding={Boolean(errors.phone)} width={"25%"}>
          <Input {...register("phone")} placeholder={"Phone number"}></Input>
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </Item>

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
  align-content: center;
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
`;

const SuccessText = styled.p`
  color: green;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0 0 0.75rem 0;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: red;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
`;

export default AddParticipant;
