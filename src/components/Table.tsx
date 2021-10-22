import styled from "styled-components";
import faker from "faker";

export function Table() {
  const fakeParticipants = new Array(20).fill(null).map((e) => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(1),
    id: faker.datatype.uuid(),
  }));

  return (
    <TableWrapper cellSpacing="0">
      <TableHead>
        <tr>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>E-mail address</TableHeadCell>
          <TableHeadCell>Phone number</TableHeadCell>
          <TableHeadCell></TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </tr>
      </TableHead>
      <tbody>
        {fakeParticipants.map((participant) => (
          <tr key={participant.id}>
            <TableRowCell>{participant.name}</TableRowCell>
            <TableRowCell>{participant.email}</TableRowCell>
            <TableRowCell>{participant.phoneNumber}</TableRowCell>
            <TableRowCell>Edit</TableRowCell>
            <TableRowCell>Delete</TableRowCell>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}

const TableWrapper = styled.table`
  width: 100%;
  background: #ffffff;
`;

const TableHead = styled.thead``;

const TableHeadCell = styled.th`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
`;

const TableRowCell = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
`;
