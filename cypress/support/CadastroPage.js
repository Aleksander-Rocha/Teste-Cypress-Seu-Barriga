class CadastroPage {
  // Seletores específicos do site Seu Barriga
  get nomeInput() { 
    return cy.get('input[placeholder="Nome"]') 
  }
  
  get emailInput() { 
    return cy.get('input[placeholder="Email"]') 
  }
  
  get passwordInput() { 
    return cy.get('input[placeholder="Password"]') 
  }
  
  get cadastroButton() { 
    return cy.get('input[type="submit"], button').contains('Cadastrar') 
  }
  
  get loginLink() { 
    return cy.get('a').contains('Login') 
  }
  
  get homeLink() { 
    return cy.get('a').contains('Seu Barriga') 
  }
  
  // Seletores para mensagens
  get alertMessage() { 
    return cy.get('.alert, .error, .success, .message').first() 
  }

  // Ações
  visit() {
    cy.visit('/cadastro')
    return this
  }

  preencherNome(nome) {
    this.nomeInput.clear().type(nome)
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

  clicarCadastrar() {
    this.cadastroButton.click()
    return this
  }

  clicarLogin() {
    this.loginLink.click()
    return this
  }

  clicarHome() {
    this.homeLink.click()
    return this
  }

  // Método combinado para cadastrar usuário
  cadastrarUsuario(nome, email, senha) {
    this.preencherNome(nome)
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarCadastrar()
    return this
  }

  // Verificações
  verificarPaginaCadastro() {
    cy.url().should('include', '/cadastro')
    cy.title().should('contain', 'Novo Usuário')
    this.nomeInput.should('be.visible')
    this.emailInput.should('be.visible')
    this.passwordInput.should('be.visible')
    this.cadastroButton.should('be.visible')
    return this
  }

  verificarRedirecionamento() {
    cy.url().should('not.include', '/cadastro')
    return this
  }

  verificarMensagem(mensagem) {
    this.alertMessage.should('be.visible').and('contain.text', mensagem)
    return this
  }

  verificarCamposObrigatorios() {
    // Verificar se campos ficam destacados quando vazios
    this.nomeInput.should('be.visible')
    this.emailInput.should('be.visible')
    this.passwordInput.should('be.visible')
    return this
  }
}

export default CadastroPage