import faker from "faker";
import { useState } from "react";
import styled from "styled-components";

import { GlobalStyle } from "./GlobalStyle";
import AddParticipant from "./components/AddParticipant";
import Header from "./components/Header";
import { Table } from "./components/Table";
import { Participant } from "./components/TableRow";

import sortBy from "lodash/sortBy";

export type SortOption = "name" | "email" | "phone";

function App() {
  const fakeParticipants = new Array(20).fill(null).map((e) => ({
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(1),
  }));

  const [participants, setParticipants] =
    useState<Participant[]>(fakeParticipants);

  const [sortOption, setSortOption] = useState<SortOption>("name");

  const sortedParticipants = sortBy(participants, sortOption);

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
        <Table
          participants={sortedParticipants}
          onUpdate={setParticipants}
          onChangeSortOption={setSortOption}
          sortOption={sortOption}
        />
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
