import styled from "styled-components";

export function Table() {
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
        <tr>
          <TableRowCell>John Doe</TableRowCell>
          <TableRowCell>john.doe@gmail.com</TableRowCell>
          <TableRowCell>0405678471</TableRowCell>
          <TableRowCell>Edit</TableRowCell>
          <TableRowCell>Delete</TableRowCell>
        </tr>
        <tr>
          <TableRowCell>John Doe</TableRowCell>
          <TableRowCell>john.doe@gmail.com</TableRowCell>
          <TableRowCell>0405678471</TableRowCell>
          <TableRowCell>Edit</TableRowCell>
          <TableRowCell>Delete</TableRowCell>
        </tr>
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
