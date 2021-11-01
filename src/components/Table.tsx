import { Fragment, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { PARTICIPANT_LIST_FORM_SCHEMA, tableInfoCells } from "../config";
import { TableHead, TableHeadCell, TableWrapper } from "../layouts/table";
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
    resolver: yupResolver(PARTICIPANT_LIST_FORM_SCHEMA),
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
    methods.handleSubmit(onSubmit)();
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
                  key={cell.fieldName}
                  data-cy={`table-head-${cell.fieldName}`}
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
