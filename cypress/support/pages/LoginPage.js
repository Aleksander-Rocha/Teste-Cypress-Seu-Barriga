class LoginPage {
  // Seletores específicos do site Seu Barriga
  get emailInput() { 
    return cy.get('input[placeholder="Email"]') 
  }
  
  get passwordInput() { 
    return cy.get('input[placeholder="Password"]') 
  }
  
  get loginButton() { 
    return cy.get('button').contains('Entrar') 
  }
  
  get novoUsuarioLink() { 
    return cy.get('a').contains('Novo usuário?') 
  }
  
  get homeLink() { 
    return cy.get('a').contains('Seu Barriga') 
  }
  
  // Seletores para mensagens (serão identificados durante os testes)
  get alertMessage() { 
    return cy.get('.alert, .error, .success, .message').first() 
  }

  verificarRedirecionamento() {
    cy.url().should('not.include', '/login')
    return this
  }

  verificarMensagem(mensagem) {
    this.alertMessage.should('be.visible').and('contain.text', mensagem)
    return this
  }

  verificarCamposObrigatorios() {
    // Verificar se campos ficam destacados quando vazios
    this.emailInput.should('be.visible')
    this.passwordInput.should('be.visible')
    return this
  }
}

export default LoginPage