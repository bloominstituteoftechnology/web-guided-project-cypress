// write tests here
describe("Quotes App", () => {
  beforeEach(() => {
    // Each test needs fresh state!
    // Tests should (must!) never rely on state left over from previous tests!
    // Every test should (must!) be able to work in isolation!!

    /**
     * setState to initial state
     * reloading?? !!!
     */
    cy.visit("http://localhost:1234")
  })

  // Helpers to centralize "getters"
  const textInput = () => cy.get("input[name=text]");
  const authorInput = () => cy.get("input[name=author]");
  const foobarInput = () => cy.get("input[name=foobar]");
  const submitBtn = () => cy.get(`button[id="submitBtn"]`);
  const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);

  it("sanity check to make sure tests work", () => {
    // "it" is a test
    // "expect" is an assertion
    // There can (and often are) multiple assertions per test
    // but they all need to relate to the one thing we're testing.
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5); // strict ===
    expect({}).not.to.equal({}); // strict === passes!
    expect({}).to.eql({}); // ==
  })

  it("the proper elements are showing", () => {
    textInput().should("exist");
    authorInput().should("exist");
    foobarInput().should("not.exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");

    cy.contains("Submit Quote").should("exist");
    cy.contains(/submit quote/i).should("exist");
  })

  describe("Filling out the inputs and cancelling", () => {
    it("can navigate to the site", () => {
      cy.url().should("include", "localhost");
    })

    it("submit button starts out disabled", () => {
      submitBtn().should("be.disabled");
    })

    it("can type in the inputs", () => {
      textInput()
        .should("have.value", "")
        .type("CSS is the best!")
        .should("have.value", "CSS is the best!");

      authorInput()
        .should("have.value", "")
        .type("Casey!")
        .should("have.value", "Casey!");
    })

    it("the submit button enables when both inputs are filled out", () => {
      authorInput().type("Casey");
      textInput().type("Lorem ipsum");
      submitBtn().should("not.be.disabled");
    })

    it("the cancel button can reset the inputs and disable the submit button", () => {
      authorInput().type("Casey");
      textInput().type("Web56 rules!");
      cancelBtn().click();
      authorInput().should("have.value", "");
      textInput().should("have.value", "");
      submitBtn().should("be.disabled");
    })
  })

  describe("Adding a new quote", () => {
    it("can submit and delete a new quote", () => {
      textInput().type("Lorem ipsum");
      authorInput().type("Suresh");
      submitBtn().click();

      // It's important that state be the same at the beginning of each test
      // and that means front end state AS WELL as database state
      cy.contains("Lorem ipsum").siblings("button:nth-of-type(2)").click();
      cy.contains("Lorem ipsum").should("not.exist");
    })
  })





})