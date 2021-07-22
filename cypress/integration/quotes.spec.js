// write tests here
describe('Quotes App',()=>{
    //before we do anything , we are going to tell it to visit our localhost where the application running
    //configuring your application to go to the right port
    beforeEach(()=>{
        cy.visit('http://localhost:1234')
    })
})

const textInput = () => cy.get('input[name=text]')
const authorInput = () => cy.get('input[name=author]')
const submitBtn = () => cy.get('button[id="submitBtn"]')
const cancelBtn = () => cy.get('button[id="cancelBtn"]')


it('sanity check for making sure everything is setup',()=>{
    //check some assertions here
    expect(1+2).to.equal(3)     //strict
    expect(2+2).not.to.equal(5)
})