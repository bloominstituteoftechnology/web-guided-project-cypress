// write tests here
describe("quotes app", () => {
  beforeEach(() => {
    //code before test runs
    cy.visit("http://localhost:1234");
  });

  const textInput = () => cy.get("input[name=text]");
  const authorInput = () => cy.get("input[name=author]");
  //   const foobarInput = () => cy.get("input[name=foobar]");
  const submitBtn = () => cy.get(`button[id="submitBtn"]`);
  const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);

  //test goes here
  it("sanity test to see if workes", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    // expect({}).not.to.equal({}); //not strict == rather than ===
    // expect({}).to.eq({}); // strcit ===
  });

  it("selecting elements from the DOM", () => {
    textInput().should("exist");
    authorInput().should("exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");
    cy.contains("Submit Quote").should("exist");
    cy.contains(/submit quote/i).should("exist"); //ignore caps
  });

  it("can type in the inputs", () => {
    textInput()
      .should("have.value", "")
      .type("Be nice to the CSS expert")
      .should("have.value", "Be nice to the CSS expert");

    authorInput()
      .should("have.value", "")
      .type("Gabe!")
      .should("have.value", "Gabe!");
  });

  it("the submit button enables when both inputs are filled out", () => {
    authorInput().type("Gabe");
    textInput().type("Have fun!");
    submitBtn().should("not.be.disabled");
  });

  it("submit button i disbled until both inputs are filled out", () => {
    submitBtn().should("be.disabled");
    textInput().type("Text Input");
    submitBtn().should("be.disabled");
    textInput().clear();
    authorInput().type("Author input");
    submitBtn().should("be.disabled");
    textInput().type("Text Input");
    submitBtn().should("not.be.disabled");
  });

  it("can cancel quote", () => {
    authorInput().type("Gabe");
    textInput().type("Have fun!");
    cancelBtn().click();
    textInput().should("have.value", "");
    authorInput().should("have.value", "");
    submitBtn().should("be.disabled");
  });

  describe("Adding a new quote", () => {
    it("can submit and delete a new quote", () => {
      textInput().type("Have fun!");
      authorInput().type("Gabe");
      submitBtn().click();
      // It's important that state be the same at the beginning of each test
      // which is why we delete the newly created post immediately.
      // If we are not careful with this, we'll get lots of false positives and negatives.
      // Restart the server script if necessary to go back to the original 3 quotes.
      // Explain that in real world, a fresh testing database with predetermined data would be spun up for each test run.
      cy.contains("Have fun!").siblings("button:nth-of-type(2)").click();
      cy.contains("Have fun!").should("not.exist");
    });
  });

  it("variation of can submit a new quote", () => {
    cy.contains(/have fun/).should("not.exist");
    textInput().type("have fun");
    authorInput().type("Gabe");
    submitBtn().click();
    cy.contains(/have fun/).should("exist");
    cy.contains(/have fun/)
      .next()
      .next()
      .click();
    cy.contains(/have fun/).should("not.exist");
  });

  describe("Editing an existing quote", () => {
    it("can edit a quote", () => {
      // Baking a new quote and submitting it.
      textInput().type("Use Postman");
      authorInput().type("Gabriel");
      submitBtn().click();
      // Hitting the edit button and checking inputs.
      cy.contains("Use Postman").siblings("button:nth-of-type(1)").click();
      textInput().should("have.value", "Use Postman");
      authorInput().should("have.value", "Gabriel");
      // Editing the quote and submitting changes.
      textInput().type(" for realz");
      authorInput().type(" Cabrejas");
      submitBtn().click();
      // Checking that the changes stuck.
      cy.contains("Use Postman for realz (Gabriel Cabrejas)");
      // Hitting the delete button for the edited quote to leave state the way it was. IMPORTANT !!
      cy.contains("Use Postman for realz (Gabriel Cabrejas)")
        .next()
        .next()
        .click();
      cy.contains("Use Postman for realz (Gabriel Cabrejas)").should(
        "not.exist"
      );
    });
  });
});
