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


