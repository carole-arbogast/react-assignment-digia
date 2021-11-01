/// <reference types="cypress" />
/* eslint-disable jest/valid-expect */
const { _ } = Cypress;

describe("Participant list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.only("should be able to create a new participant", () => {
    const newParticipant = {
      name: "John Doe",
      email: "john@doe.com",
      phone: "4815162342",
    };
    // Submit on click
    cy.get("[data-cy=add-participant-name]").type(newParticipant.name);
    cy.get("[data-cy=add-participant-email]").type(newParticipant.email);
    cy.get("[data-cy=add-participant-phone]").type(newParticipant.phone);
    cy.get("[data-cy=add-participant-btn]").click();
    cy.get("[data-cy=success-text]").should("be.visible");
    cy.get("[data-cy=add-participant-name]").should("have.value", "");
    cy.get("[data-cy=add-participant-email]").should("have.value", "");
    cy.get("[data-cy=add-participant-phone]").should("have.value", "");

    cy.contains(newParticipant.name)
      .parent()
      .within(() => {
        cy.get("td").eq(0).should("have.text", newParticipant.name);
        cy.get("td").eq(1).should("have.text", newParticipant.email);
        cy.get("td").eq(2).should("have.text", newParticipant.phone);
      });

    // Submit on enter
    cy.get("[data-cy=add-participant-name]").type(newParticipant.name);
    cy.get("[data-cy=add-participant-email]").type(newParticipant.email);
    cy.get("[data-cy=add-participant-phone]").type(
      `${newParticipant.phone} {Enter}`
    );
    cy.get("[data-cy=success-text]").should("be.visible");

    // Check form validation
    cy.get("[data-cy=add-participant-btn]").click();
    cy.get("[data-cy=validation-error-name]").should("be.visible");
    cy.get("[data-cy=validation-error-email]").should("be.visible");
    cy.get("[data-cy=validation-error-phone]").should("be.visible");

    cy.get("[data-cy=add-participant-name]").type(newParticipant.name);
    cy.get("[data-cy=add-participant-btn]").click();
    cy.get("[data-cy=validation-error-name]").should("not.exist");
    cy.get("[data-cy=add-participant-email]").type("invalid email");
    cy.get("[data-cy=add-participant-btn]").click();
    cy.get("[data-cy=validation-error-email]").should("be.visible");
    cy.get("[data-cy=add-participant-email]")
      .clear()
      .type(newParticipant.email);
    cy.get("[data-cy=add-participant-btn]").click();
    cy.get("[data-cy=validation-error-email]").should("not.exist");
    cy.get("[data-cy=add-participant-phone]").type(newParticipant.phone);
    cy.get("[data-cy=add-participant-btn]").click();
    cy.get("[data-cy=validation-error-phone]").should("not.exist");
  });

  it("should be able to edit a participant", () => {
    const updatedParticipant = {
      name: "Updated Participant",
      email: "updated@email.com",
      phone: "123456789",
    };

    // Submit on click
    cy.get("[data-cy=edit-btn]").eq(0).click();
    cy.get("[data-cy=edit-participant-form]").should("be.visible");
    cy.get("[data-cy=edit-participant-name]")
      .clear()
      .type(updatedParticipant.name);
    cy.get("[data-cy=edit-participant-email]")
      .clear()
      .type(updatedParticipant.email);
    cy.get("[data-cy=edit-participant-phone]")
      .clear()
      .type(updatedParticipant.phone);
    cy.get("[data-cy=save-btn]").click();

    cy.contains(updatedParticipant.name)
      .parent()
      .within(() => {
        cy.get("td").eq(0).should("have.text", updatedParticipant.name);
        cy.get("td").eq(1).should("have.text", updatedParticipant.email);
        cy.get("td").eq(2).should("have.text", updatedParticipant.phone);
      });

    // Submit on Enter
    cy.get("[data-cy=edit-btn]").eq(0).click();
    cy.get("[data-cy=edit-participant-name]").clear().type("New Name {Enter}");
    cy.contains("New Name").should("exist");

    // Form validation
    cy.get("[data-cy=edit-btn]").eq(0).click();
    cy.get("[data-cy=edit-participant-name]").clear();
    cy.get("[data-cy=edit-participant-email]").clear();
    cy.get("[data-cy=edit-participant-phone]").clear();

    cy.get("[data-cy=save-btn]").click();
    cy.get("[data-cy=validation-error-name]").should("be.visible");
    cy.get("[data-cy=validation-error-email]").should("be.visible");
    cy.get("[data-cy=validation-error-phone]").should("be.visible");

    cy.get("[data-cy=edit-participant-name]").type(updatedParticipant.name);
    cy.get("[data-cy=validation-error-name]").should("not.exist");
    cy.get("[data-cy=edit-participant-email]").type("invalid email");
    cy.get("[data-cy=save-btn]").click();
    cy.get("[data-cy=validation-error-email]").should("be.visible");
    cy.get("[data-cy=edit-participant-email]")
      .clear()
      .type(updatedParticipant.email);
    cy.get("[data-cy=validation-error-email]").should("not.exist");
    cy.get("[data-cy=edit-participant-phone]").type(updatedParticipant.phone);
    cy.get("[data-cy=validation-error-phone]").should("not.exist");

    // Cancel
    return cy
      .get("[data-cy=participant-row]")
      .eq(0)
      .then((row) => {
        const text = row.text();
        cy.get("[data-cy=edit-btn]").eq(0).click();
        cy.get("[data-cy=edit-participant-name]").clear().type("Canceled Name");
        cy.get("[data-cy=cancel-btn]").click();
        const updatedText = row.text();
        expect(text).eq(updatedText);
      });
  });

  it("should be able to delete a participant", () => {
    cy.get("[data-cy=participant-row]").should("have.length", 20);
    return cy
      .get("[data-cy=participant-row]")
      .eq(0)
      .then((row) => {
        const text = row.text();
        cy.contains(text).should("be.visible");
        cy.get("[data-cy=delete-btn]").eq(0).click();
        cy.contains(text).should("not.exist");
        cy.get("[data-cy=participant-row]").should("have.length", 19);
      });
  });

  it("should be able to sort the participants by name", () => {
    cy.get("[data-cy=table-head-name]").click();

    return cy.get("[data-cy=participant-info-name]").then((res) => {
      const names = _.map(res, "textContent");
      const sorted = _.orderBy(names, null, ["asc"]);
      expect(names).to.deep.equal(sorted);
    });
  });

  it("should be able to sort the participants by email", () => {
    cy.get("[data-cy=table-head-email]").click();

    return cy.get("[data-cy=participant-info-email]").then((res) => {
      const emails = _.map(res, "textContent");
      const sorted = _.orderBy(emails, null, ["asc"]);
      expect(emails).to.deep.equal(sorted);
    });
  });

  it("should be able to sort the participants by phone number", () => {
    cy.get("[data-cy=table-head-phone]").click();

    return cy.get("[data-cy=participant-info-phone]").then((res) => {
      const phones = _.map(res, "textContent");
      const sorted = _.orderBy(phones, null, ["asc"]);
      expect(phones).to.deep.equal(sorted);
    });
  });
});
