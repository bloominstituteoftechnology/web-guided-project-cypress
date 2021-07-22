// write tests here
describe('Quotes App ', () => {
    //schedule something to happen before each test
    // before each test we navigate http://loclahost:1234
    beforeEach(() => {
        cy.visit('http://localhost:1234')
    })
// use the 'it' for the first test (one test with several assertions)
it ('sanity check', () => {
    //assertion(s)
    expect(5).to.equal(5)
    expect(1+2).to.equal(3)
    expect({}).to.eql({})//can't use equal here
    expect({}).to.not.equal({})

})


});
