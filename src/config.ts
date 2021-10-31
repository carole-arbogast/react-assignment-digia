import faker from "faker";
import * as yup from "yup";

export const FAKE_PARTICIPANTS: Participant[] = new Array(20)
  .fill(null)
  .map(() => ({
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.phoneNumberFormat(1),
  }));

export const PARTICIPANT_FORM_SCHEMA = yup.object({
  name: yup.string().required("This field is required."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("This field is required."),
  phone: yup.string().required("This field is required"),
});

export const PARTICIPANT_LIST_FORM_SCHEMA = yup.object({
  participants: yup.array().of(PARTICIPANT_FORM_SCHEMA),
});

interface TableCell {
  fieldName: string;
  header: string;
  placeHolder: string;
  width: string;
  type: string;
}

export const tableInfoCells: TableCell[] = [
  {
    fieldName: "name",
    header: "Name",
    placeHolder: "Full Name",
    width: "20%",
    type: "text",
  },
  {
    fieldName: "email",
    header: "E-mail address",
    placeHolder: "E-mail address",
    width: "30%",
    type: "email",
  },
  {
    fieldName: "phone",
    header: "Phone number",
    placeHolder: "Phone number",
    width: "25%",
    type: "tel",
  },
];
