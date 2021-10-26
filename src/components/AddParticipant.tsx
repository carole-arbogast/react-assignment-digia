import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, Input } from "./TableRow";
import faker from "faker";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onAddParticipant: Function;
}

export function AddParticipant(props: Props) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const { onAddParticipant } = props;

  const onSubmit = (data: FormData) => {
    onAddParticipant({ ...data, id: faker.datatype.uuid() });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexWrapper>
        <Item width={"20%"}>
          <Input {...register("name")} placeholder={"Full name"}></Input>
        </Item>
        <Item width={"30%"}>
          <Input {...register("email")} placeholder={"E-mail address"}></Input>
        </Item>
        <Item width={"25%"}>
          <Input {...register("phone")} placeholder={"Phone number"}></Input>
        </Item>

        <Item width={"25%"}>
          <StyledButton inverted>Add new</StyledButton>
        </Item>
      </FlexWrapper>
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

const Item = styled.div<{ width: string }>`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 1rem 0 1rem 1rem;
  width: ${(props) => props.width};

  &:last-child {
    padding: 1rem;
  }
`;

const StyledButton = styled(Button)`
  color: #757575;
`;

export default AddParticipant;
