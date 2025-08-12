describe('Seu Barriga - Testes de Contas', () => {
  
  beforeEach(() => {
    beforeEach(() => {
  cy.criarELogarUsuario();
});

  })

  it('CT001 - Teste Logout', () => {
    // Verificar que está logado (área interna)
    cy.url().should('include', '/logar')
    cy.get('a').contains('Sair').should('be.visible')

    // Realizar logout
    cy.get('a').contains('Sair').click()

    // Verificar que foi redirecionado para página de login
    cy.url().should('include', '/logout')
  })
})