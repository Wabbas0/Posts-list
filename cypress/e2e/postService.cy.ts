import { samplePosts } from '../../src/__mocks__/posts'

describe('Data service', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should throw an error', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts', {
      forceNetworkError: true
    }).as('getPosts')

    cy.wait('@getPosts')

    // Check that the error message is displayed
    cy.get('.post-list-empty p').should('contain', 'An error occurred while fetching posts')
  })

  it('Should fetch posts', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts', {
      body: samplePosts,
      headers: {
        'access-control-allow-origin': '*'
      }
    }).as('getPosts')

    cy.wait('@getPosts')

    cy.get('.post-item').should('have.length', 5)
  })
})
