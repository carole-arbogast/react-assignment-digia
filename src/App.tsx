import { useState } from "react";
import styled from "styled-components";

import { GlobalStyle } from "./components/GlobalStyle";
import AddParticipant from "./components/AddParticipant";
import Header from "./components/Header";
import { Table } from "./components/Table";
import { FAKE_PARTICIPANTS } from "./config";

import sortBy from "lodash/sortBy";

function App() {
  const [participants, setParticipants] =
    useState<Participant[]>(FAKE_PARTICIPANTS);

  const [sortOption, setSortOption] = useState("name");

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
