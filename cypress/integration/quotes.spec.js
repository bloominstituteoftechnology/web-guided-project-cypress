// write tests here
describe('Quotes App',()=>{
    //before we do anything , we are going to tell it to visit our localhost where the application running
    //configuring your application to go to the right port
    beforeEach(()=>{
        cy.visit('http://localhost:1234')
    })

    it('check for right elements showing',()=>{
        textInput().should('exist')
        authorInput().should('exist')
        submitBtn().should('exist')
        cancelBtn().should('exist')
        foobarInput().should('not.exist')

    })
    // here we check the submit button disable'
    it('submit button disable',()=>{
        submitBtn().should('be.disabled')
    })
    //here we check that text input box allows to type in
    it('check that text can be',()=>{
        textInput()
            .should('have.value',"")
            .type("Cypress is great testing framework")
            .should('have.value',"Cypress is great testing framework")
        
        authorInput()
            .should('have.value',"")
            .type('Shweta')
            .should('have.value','Shweta')
    })

    // After your both text boxes got the values - submit button enables
    it('submit button should be enabled',()=>{
        textInput().type("Have fun")
        authorInput().type("Shweta")
        submitBtn().should('not.be.disabled')
    })

    //testing for cancel button, when click it should empty the text boxes
    it('cancel button click',()=>{
        textInput().type("Have fun")
        authorInput().type("Shweta")
        cancelBtn().click()
        textInput().should('have.value',"")
        authorInput().should('have.value',"")
    })
    it('adding a quote by hitting submit button ',()=>{
        textInput().type("Web 45 is cool, and fast learners")
        authorInput().type("Shweta")
        submitBtn().click()
        textInput().should('have.value',"")
        authorInput().should('have.value',"")
        submitBtn().should('be.disabled')
        cy.contains('Web 45 is cool, and fast learners').siblings('button:nth-of-type(2)').click()
        cy.contains('Web 45 is cool, and fast learners').should('not.exist')
    })

    describe('Adding a new quote', () => {
        it('can submit and delete a new quote', () => {
          textInput().type('Have fun!')
          authorInput().type('Gabe')
          submitBtn().click()
          // It's important that state be the same at the beginning of each test
          // which is why we delete the newly created post immediately.
          // If we are not careful with this, we'll get lots of false positives and negatives.
          // Restart the server script if necessary to go back to the original 3 quotes.
          // Explain that in real world, a fresh testing database with predetermined data would be spun up for each test run.
          cy.contains('Have fun!').siblings('button:nth-of-type(2)').click()
          cy.contains('Have fun!').should('not.exist')
        })
    
        it('variation of can submit a new quote', () => {
          cy.contains(/have fun/).should('not.exist')
          textInput().type('have fun')
          authorInput().type('Gabe')
          submitBtn().click()
          cy.contains(/have fun/).should('exist')
          cy.contains(/have fun/).next().next().click()
          cy.contains(/have fun/).should('not.exist')
        })
      })
    
      describe('Editing an existing quote', () => {
        it('can edit a quote', () => {
          // Baking a new quote and submitting it.
          textInput().type('Use Postman')
          authorInput().type('Gabriel')
          submitBtn().click()
          // Hitting the edit button and checking inputs.
          cy.contains('Use Postman').siblings('button:nth-of-type(1)').click()
          textInput().should('have.value', 'Use Postman')
          authorInput().should('have.value', 'Gabriel')
          // Editing the quote and submitting changes.
          textInput().type(' for realz')
          authorInput().type(' Cabrejas')
          submitBtn().click()
          // Checking that the changes stuck.
          cy.contains('Use Postman for realz (Gabriel Cabrejas)')
          // Hitting the delete button for the edited quote to leave state the way it was. IMPORTANT !!
          cy.contains('Use Postman for realz (Gabriel Cabrejas)').next().next().click()
          cy.contains('Use Postman for realz (Gabriel Cabrejas)').should('not.exist')
        })
    })
})

const textInput = () => cy.get('input[name="text"]')
const authorInput = () => cy.get('input[name="author"]')
const foobarInput = () => cy.get('input[name=foobar]')
const submitBtn = () => cy.get('button[id="submitBtn"]')
const cancelBtn = () => cy.get('button[id="cancelBtn"]')


it('sanity check for making sure everything is setup',()=>{
    //check some assertions here
    expect(1+2).to.equal(3)     //strict
    expect(2+2).not.to.equal(5)
})


describe('Able to visit to got the right url',()=>{
    it('can navigate to the site',()=>{
        cy.url().should('include','localhost')
    })
})


