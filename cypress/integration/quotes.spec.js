describe("Quotes App", () => {
    beforeEach(() => {
        // Each test needs fresh state
        // Tests shouldn't rely on other tests
        // Every test should work in isolation

        cy.visit("http://localhost:1234"); // CAREFUL
    })

    // Helpers (ie GETTERS)
    const textInput = () => cy.get("input[name=text");
    const authorInput = () => cy.get("input[name=author]");
    const foobarInput = () => cy.get("input[name=foobar]");
    const submitBtn = () => cy.get(`button[id="submitBtn"]`);
    const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);

    it("sanity check to make sure tests work", () => {
        // "it" is a test
        // "expect" is an assertion
        // There can be multiple assertions per test, but they all need
        // to relate to the "one thing   that we're testing

        expect(1+2).to.equal(3);
        expect(2+2).not.equal(5);
        expect({}).not.to.equal({})
    })

    // CI/CD -> Continuous Integration / Continuous Delivery

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
            textInput().should("have.value", "").type("CSS rulez").should("have.value", "CSS rulez");
            authorInput().should("have.value", "").type("CRHarding").should("have.value", "CRHarding");
        })
        it("the submit button enables when both inputs are filled out", () => {
            textInput().type("This is Fun!");
            authorInput().type("Jay");
            submitBtn().should("not.be.disabled");
        })
        it("the cancel button can reset the inputs and disable the submit button", () => {
            authorInput().type("Casey");
            textInput().type("FUN!");
            cancelBtn().click();
            authorInput().should("have.value", "")  
            textInput().should("have.value", "")
            submitBtn().should("be.disabled")
        })
    })
    describe("Adding a new quote", () => {
        it("can submit and delete a new quote", () => {
            textInput().type("CSS rulez");
            authorInput().type("CRHarding");
            submitBtn().click();

            cy.contains("CSS rulez").siblings("button:nth-of-type(2)").click();
            cy.contains("CSS rulez").should("not.exist");
        
        cy.contains("CSS rulez").should("not.exist");
        textInput().type("CSS rulez");
        authorInput().type("Casey");
        submitBtn().click();
        cy.contains("CSS rulez");
        cy.contains("Casey");
        cy.contains("CSS rulez").next().next().click();
        cy.contains("CSS rulez").should("not.exist");
        })
    })

    describe("Editing an existing quote", () => {
        it("can edit a quote", () => {
            textInput().type("Lorem ipsum");
            authorInput().type("CRHarding");
            submitBtn().click();
            cy.contains("Lorem ipsum").siblings("button:nth-of-type(1)").click();
            textInput().should("have.value", "Lorem ipsum");
            authorInput().should("have.value", "CRHarding");
            textInput().type(" dolor sit");
            authorInput().type(" ROCKS!")
            submitBtn().click();
            cy.contains("Lorem ipsum dolor sit (CRHarding ROCKS!)");
            // gotta hit that delete button!
            cy.contains("Lorem ipsum dolor sit (CRHarding ROCKS!)").siblings("button:nth-of-type(2)").click();
            cy.contains("Lorem ipsum dolor sit (CRHarding ROCKS!)").should("not.exist");
        })
    })








})