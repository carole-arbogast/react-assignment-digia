import styled from "styled-components";
import Header from "./components/Header";
import { GlobalStyle } from "./GlobalStyle";

function App() {
  return (
    <div className="App">
      <GlobalStyle />

      <Header />
      <Container>
        <Title>List of participants</Title>
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 912px;
  margin: 2rem;
`;

const Title = styled.h2`
  color: #757575;
`;

export default App;
