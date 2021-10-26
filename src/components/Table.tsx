import { Fragment, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

import TableRow, { Participant } from "./TableRow";

interface FormData {
  participants: {
    name: string;
    email: string;
    phone: string;
  }[];
}

interface Props {
  // TODO type
  onUpdate: Function;
  participants: Participant[];
}

export function Table(props: Props) {
  const [editingRow, setEditingRow] = useState<string | null>();

  const { onUpdate, participants } = props;

  const onSubmit = (data: FormData) => {
    onUpdate(data.participants);
    setEditingRow(null);
  };

  const methods = useForm<FormData>({
    defaultValues: { participants },
  });

  useEffect(() => {
    methods.reset({ participants });
  }, [participants, methods]);

  const { fields, remove } = useFieldArray({
    name: "participants",
    control: methods.control,
  });

  const handleDeleteParticipant = (index: number) => {
    remove(index);
    methods.handleSubmit(onSubmit);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TableWrapper cellSpacing="0">
          <TableHead>
            <tr>
              <TableHeadCell width={"20%"}>Name</TableHeadCell>
              <TableHeadCell width={"30%"}>E-mail address</TableHeadCell>
              <TableHeadCell width={"25%"}>Phone number</TableHeadCell>
              <TableHeadCell width={"25%"}></TableHeadCell>
            </tr>
          </TableHead>
          <tbody>
            {fields.map((participant, index) => (
              <Fragment key={participant.id}>
                <TableRow
                  participant={participant}
                  index={index}
                  onEdit={setEditingRow}
                  onDelete={handleDeleteParticipant}
                  isEditing={editingRow === participant.id}
                />
              </Fragment>
            ))}
          </tbody>
        </TableWrapper>
      </form>
    </FormProvider>
  );
}

const TableWrapper = styled.table`
  background: #ffffff;
  width: 912px;
  table-layout: fixed;
`;

const TableHead = styled.thead`
  color: #757575;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`;

const TableHeadCell = styled.th<{ width: string }>`
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
  padding: 1rem 0.5rem;
  width: ${(props) => props.width};

  &:first-child {
    padding-left: 1rem;
  }
`;
