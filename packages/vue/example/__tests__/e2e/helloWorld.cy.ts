describe("hello world", () => {
  it("", () => {
    cy.visit("packages/vue/example/helloworld/index.html");

    const alerts: string[] = [];
    cy.on("window:alert", (str) => {
      // expect(str).to.be.oneOf(["mouse over", "click"]);
      alerts.push(str);
    });

    cy.get("p.yellow").trigger("mouseover");
    cy.get("p.blue").click();

    cy.then(() => {
      expect(alerts).to.deep.equal(["mouse over", "click"]);
    });
  });
});
