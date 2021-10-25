import styled from "styled-components";
import faker from "faker";
import TableRow from "./TableRow";

export function Table() {
  const fakeParticipants = new Array(20).fill(null).map((e) => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(1),
    id: faker.datatype.uuid(),
  }));

  return (
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
        {fakeParticipants.map((participant) => (
          <TableRow participant={participant} />
        ))}
      </tbody>
    </TableWrapper>
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
