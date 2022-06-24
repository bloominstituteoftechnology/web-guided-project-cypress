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
})