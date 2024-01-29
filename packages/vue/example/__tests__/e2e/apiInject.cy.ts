describe("api inject", () => {
  it("", () => {
    cy.visit("packages/vue/example/apiInject/index.html");

    const expectedContents = [
      "name: Father",
      "age: 70",
      "living in: USA",
      "pet: two cats and one dog",
      "hobby: coding",
      "nothing: undefined",
    ];

    cy.get("p").each((element, index) => {
      cy.wrap(element).should("have.text", expectedContents[index]);
    });
  });
});
