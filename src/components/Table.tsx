import { Fragment, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { SortOption } from "../App";

import TableRow, { Participant } from "./TableRow";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  onChangeSortOption: (sortOption: SortOption) => void;
  sortOption: SortOption;
}

const formSchema = yup.object({
  participants: yup.array().of(
    yup.object({
      name: yup.string().required("This field is required."),
      email: yup
        .string()
        .email("Please enter a valid email.")
        .required("This field is required."),
      phone: yup.string().required("This field is required"),
    })
  ),
});

export function Table(props: Props) {
  const [editingRow, setEditingRow] = useState<string | null>();

  const { onUpdate, participants, onChangeSortOption, sortOption } = props;

  const onSubmit = (data: FormData) => {
    onUpdate(data.participants);
    setEditingRow(null);
  };

  const methods = useForm<FormData>({
    defaultValues: { participants },
    resolver: yupResolver(formSchema),
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
              <TableHeadCell
                width={"20%"}
                onClick={() => onChangeSortOption("name")}
                clickable
              >
                Name {sortOption === "name" && <span>&darr;</span>}
              </TableHeadCell>
              <TableHeadCell
                width={"30%"}
                onClick={() => onChangeSortOption("email")}
                clickable
              >
                E-mail address {sortOption === "email" && <span>&darr;</span>}
              </TableHeadCell>
              <TableHeadCell
                width={"25%"}
                onClick={() => onChangeSortOption("phone")}
                clickable
              >
                Phone number {sortOption === "phone" && <span>&darr;</span>}
              </TableHeadCell>
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
