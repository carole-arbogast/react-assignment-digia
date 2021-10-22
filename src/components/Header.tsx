import styled from "styled-components";

export function Header() {
  return (
    <HeaderWrapper>
      <Logo></Logo>
      <Title>Nord Software</Title>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  background: #adb5bd;
  height: 6rem;
`;

const Logo = styled.div`
  background: white;
  height: 2rem;
  width: 2rem;
  margin: 2rem;
`;

const Title = styled.h1`
  color: white;
`;

export default Header;
