// write tests here
describe("Quotes App ", () => {
  //schedule something to happen before each test
  // before each test we navigate http://loclahost:1234
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  const textInput = () => cy.get('input[name="text"]');
  const authorInput = () => cy.get('input[name="author"]');
  const submitBtn = () => cy.get('button[id="submitBtn"]');
  const cancelBtn = () => cy.get('button[id="cancelBtn"]');
  // use the 'it' for the first test (one test with several assertions)
  it("sanity check", () => {
    //assertion(s)
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);

    expect({}).to.not.equal({}); // can use "equal" here// and not strict i.e. (==)
    expect({}).to.eql({}); //can't use equal here// and deeply strick i.e. (===)
  });

  it("playing around selecting elements in the dom", () => {
    //these search for existance of specific elements by "selector" just like css does

    // cy.get('input[name="text"]').should('exist');
    textInput().should("exist");
    cy.get('input[name="foobar"]').should("not.exist");
    // cy.get('input[name="author"]').should("exist");
    authorInput().should("exist");
    // cy.get('button[id="submitBtn"]').should("exist");
    submitBtn().should("exist");
    // cy.get('button[id="cancelBtn"]').should("exist");
    cancelBtn().should("exist");
    cy.contains("Submit Quote"); //searches for text associate with DOM elements
    cy.contains(/submit quote/i);
  });

  it("can type in the inputs", () => {
    //grab the inputs
    //asserts that they are empty
    //type in them
    //assert tht the thing we typed is there
    // cy.get('input[name="text"]')
    textInput()
      .should("have.value", "")
      .type("have fun learning React") //types sting into the actual field on the browser
      .should("have.value", "have fun learning React");

    // cy.get('input[name="author"]')
    authorInput()
      .should("have.value", "")
      .type("have fun learning React") //types sting into the actual field on the browser
      .should("have.value", "have fun learning React");
  });

  it("submit button is disabled until both inputs are filled out", () => {
    //1. Arrange - set up, sanity checks (make sure initial state is the state we expect)
    //2 Act - like typing or clicking - mimicking user input
    //3 Assert - that the action has the effect we expect

    //first write pseudo code...then actual code including
    //1. "be.disabled"
    //2. .clear{}

    //button is disabled is true
    submitBtn().should("be.disabled");
    //type in the text field
    textInput().type("TEXT INPUT");
    //butt is disabled is still true
    submitBtn().should("be.disabled");
    //empty the test field
    textInput().clear();
    //type in the author field
    authorInput().type("AUTHOR INPUT");
    //button is disabled is still true
    submitBtn().should("be.disabled");
    //type in text field
    textInput().type("TEXT INPUT2");
    //button is disabled is now FALSE or NOT disabled
    submitBtn().should("not.be.disabled");
  });

  it("can cancel a quote", () => {
    textInput().type("TEXT INPUT3");
    authorInput().type("AUTHOR INPUT3");
    cancelBtn().click();
    authorInput().should("have.value", "");
  });

  it("can submit a new non-duplicate quote", () => {
    //setup:
    //act
    //assert
    const newQuote = "HERES A NEW QUOTE";
    const theNewQuote = () => cy.contains(newQuote);
    submitBtn().should("be.disabled");
    authorInput().type("Author NAME");
    theNewQuote().should("not.exist");
    textInput().type(newQuote);
    submitBtn().should("not.be.disabled");
    submitBtn().click();
    theNewQuote().should("exist");
    submitBtn().should("be.disabled");
  });
});
