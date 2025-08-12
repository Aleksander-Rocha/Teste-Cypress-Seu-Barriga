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

  // Ações
  visit() {
    cy.visit('/login')
    return this
  }

  preencherEmail(email) {
    this.emailInput.clear().type(email)
    return this
  }

  preencherSenha(senha) {
    this.passwordInput.clear().type(senha)
    return this
  }

  clicarEntrar() {
    this.loginButton.click()
    return this
  }

  clicarNovoUsuario() {
    this.novoUsuarioLink.click()
    return this
  }

  clicarHome() {
    this.homeLink.click()
    return this
  }

  // Método combinado para fazer login
  fazerLogin(email, senha) {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarEntrar()
    return this
  }

  // Verificações
  verificarPaginaLogin() {
    cy.url().should('include', '/login')
    cy.title().should('contain', 'Log in')
    this.emailInput.should('be.visible')
    this.passwordInput.should('be.visible')
    this.loginButton.should('be.visible')
    return this
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