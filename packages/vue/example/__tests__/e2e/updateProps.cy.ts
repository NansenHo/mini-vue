describe("update props", () => {
  it("", () => {
    cy.visit("packages/vue/example/updateProps/index.html");
    cy.get("div#root").should("have.attr", "foo", "foo");
    cy.get("div#root").should("have.attr", "bar", "bar");

    cy.get("button.modify").click();
    cy.get("div#root").should("have.attr", "foo", "new-foo");
    cy.get("div#root").should("have.attr", "bar", "bar");

    cy.get("button.delete-undefined").click();
    cy.get("div#root").should("not.have.attr", "foo");
    cy.get("div#root").should("have.attr", "bar", "bar");

    cy.get("button.delete-null").click();
    cy.get("div#root").should("have.attr", "foo", "foo");
    cy.get("div#root").should("not.have.attr", "bar");
  });
});
