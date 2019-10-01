/// <reference types="Cypress" />

describe('Pomodoro MVC', function () {
    it('Clicks the start button', function () {
        cy.visit('http://localhost:3000/')

        cy.getTestElement('start-button').click();
    })

    it('Resets the timer', function () {
        cy.visit('http://localhost:3000/')

        cy.getTestElement('reset-button').click();

        let workMinutesDial
        // check the initial value of work dial
        cy.getTestElement('dial').first().find('span')
            .then(($title) => {
                // save text from the first element
                workMinutesDial = $title.text()
            })

        // compare if after resetting clock shows the same value as work minutes dial
        cy.getTestElement('clock-time-remaining').find('span').first()
            .should(($identifier) => {
                // we can massage text before comparing
                const idText = $identifier.text()

                // text from the title element should already be set
                expect(idText, 'ID').to.equal(workMinutesDial)
            })
    })

    it('Decrements work minutes by one', function () {
        cy.visit('http://localhost:3000/')

        // decrement by one
        cy.getTestElement('dial').first()
            .find('button')
            .first()
            .click()

        cy.getTestElement('dial').first().should('contain', 24);
    })

    it('Applies .active class to the start button', function () {
        cy.visit('http://localhost:3000/')

        cy.getTestElement('start-button').click()
        cy.getTestElement('start-button').should('have.class', 'active')
    })
})