describe("update component", () => {
  it("", () => {
    cy.visit("packages/vue/example/componentUpdate/index.html");

    cy.get("button.props").click();
    cy.get("div.child div p").invoke("text").should("eq", "456");

    cy.get("button.count").click();
    cy.get("p.count").invoke("text").should("eq", "count:2");
  });
});
