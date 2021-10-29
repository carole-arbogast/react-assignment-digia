import { Fragment, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

import { yupResolver } from "@hookform/resolvers/yup";

import { participantsListFormSchema, tableInfoCells } from "../config";
import TableRow from "./TableRow";

interface Props {
  onUpdate: (participants: Participant[]) => void;
  participants: Participant[];
  onChangeSortOption: (sortOption: string) => void;
  sortOption: string;
}

export function Table(props: Props) {
  const [editingRow, setEditingRow] = useState<string | null>();

  const { onUpdate, participants, onChangeSortOption, sortOption } = props;

  const methods = useForm<ParticipantsListForm>({
    defaultValues: { participants },
    resolver: yupResolver(participantsListFormSchema),
  });

  const { fields, remove } = useFieldArray({
    name: "participants",
    control: methods.control,
  });

  const onSubmit = (data: ParticipantsListForm) => {
    onUpdate(data.participants);
    setEditingRow(null);
  };

  const handleDeleteParticipant = (index: number) => {
    remove(index);
    methods.handleSubmit(onSubmit);
  };

  useEffect(() => {
    methods.reset({ participants });
  }, [participants, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TableWrapper cellSpacing="0">
          <TableHead>
            <tr>
              {tableInfoCells.map((cell) => (
                <TableHeadCell
                  width={cell.width}
                  onClick={() => onChangeSortOption(cell.fieldName)}
                  clickable
                >
                  {cell.header}{" "}
                  {sortOption === cell.fieldName && <span>&darr;</span>}
                </TableHeadCell>
              ))}
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

const TableHeadCell = styled.th<{ width: string; clickable?: boolean }>`
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
  padding: 1rem 0.5rem;
  width: ${(props) => props.width};
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};

  &:first-child {
    padding-left: 1rem;
  }
`;
