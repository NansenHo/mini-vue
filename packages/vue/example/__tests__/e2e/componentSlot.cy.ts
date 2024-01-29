describe("api inject", () => {
  it("", () => {
    cy.visit("packages/vue/example/componentSlot/index.html");

    const expectedContents = ["123", "你好啊", "foo"];

    cy.get("div.title").should("have.text", "App");

    cy.get("p").each((element, index) => {
      cy.wrap(element).should("have.text", expectedContents[index]);
    });
  });
});
