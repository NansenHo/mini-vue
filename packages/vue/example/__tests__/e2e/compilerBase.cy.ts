describe("compiler base", () => {
  it("should render the value of ref", () => {
    cy.visit("packages/vue/example/compilerBase/index.html");
    cy.get("p").should("have.text", "1");
  });
});
