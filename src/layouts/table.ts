import styled from "styled-components";

interface TableRowCellProps {
  smallPadding?: boolean;
  noBottomPadding?: boolean;
}

export const TableWrapper = styled.table`
  background: #ffffff;
  width: 912px;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  color: #757575;
  font-size: 14px;
  line-height: 1rem;
  font-weight: 500;
`;

export const TableHeadCell = styled.th<{ width: string; clickable?: boolean }>`
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
  padding: 1rem 0.5rem;
  width: ${(props) => props.width};
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};

  &:first-child {
    padding-left: 1.5rem;
  }
`;

export const TableRowCell = styled.td<TableRowCellProps>`
  border-bottom: 1px solid #f1f1f1;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: ${(props) => `${props.smallPadding ? "1rem" : "1.5rem"} 0.5rem`};
  word-break: break-word;
  padding-bottom: ${(props) => props.noBottomPadding && "0"};

  &:first-child {
    padding-left: ${(props) => (props.smallPadding ? "1rem" : "1.5rem")};
  }

  &:last-child {
    padding-right: ${(props) => (props.smallPadding ? "1rem" : "1.5rem")};
  }
`;
