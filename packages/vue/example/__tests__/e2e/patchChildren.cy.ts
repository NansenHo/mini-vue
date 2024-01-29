describe("patch children", () => {
  it("", () => {
    cy.visit("packages/vue/example/patchChildren/index.html");

    const content = ["主页", "A", "B", "C", "D", "E", "Z", "F", "G"];

    cy.get("p").each((element, index) => {
      cy.wrap(element).should("have.text", content[index]);
    });
  });
});
