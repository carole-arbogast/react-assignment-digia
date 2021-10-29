interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ParticipantsListForm {
  participants: Participant[];
}
