import { useState } from "react";
import styled from "styled-components";
import AddParticipant from "./components/AddParticipant";
import Header from "./components/Header";
import { Table } from "./components/Table";
import { GlobalStyle } from "./GlobalStyle";
import faker from "faker";
import { Participant } from "./components/TableRow";

function App() {
  const fakeParticipants = new Array(20).fill(null).map((e) => ({
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(1),
  }));

  const [participants, setParticipants] =
    useState<Participant[]>(fakeParticipants);

  console.log(participants);

  const handleAddParticipant = (newParticipant: Participant) => {
    const newList = [...participants, newParticipant];
    setParticipants(newList);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Container>
        <Title>List of participants</Title>
        <AddParticipant onAddParticipant={handleAddParticipant} />
        <Table participants={participants} onUpdate={setParticipants} />
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin: 2rem;
`;

const Title = styled.h2`
  color: #757575;
`;

export default App;
