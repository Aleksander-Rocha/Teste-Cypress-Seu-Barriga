

Cypress.Commands.add('setupUsuarioCompleto', () => {
  const timestamp = Date.now()
  const usuario = {
    nome: `Usuario Teste ${timestamp}`,
    email: `teste${timestamp}@email.com`,
    senha: 'MinhaSenh@123'
  }

  // Cadastrar usuário
  cy.visit('https://seubarriga.wcaquino.me/cadastro')
  cy.get('input[placeholder="Nome"]').type(usuario.nome)
  cy.get('input[placeholder="Email"]').type(usuario.email)
  cy.get('input[placeholder="Password"]').type(usuario.senha)
  cy.get('input[type="submit"], button').contains('Cadastrar').click()
  cy.wait(2000)

  // Fazer login
  cy.visit('https://seubarriga.wcaquino.me/login')
  cy.get('input[placeholder="Email"]').type(usuario.email)
  cy.get('input[placeholder="Password"]').type(usuario.senha)
  cy.get('button').contains('Entrar').click()
  return cy.wrap(usuario)
})

Cypress.Commands.add('criarMovimentacao', (dataMov, dataPag, descricao, interessado, valor) => {
  cy.get('input').eq(0).type(dataMov);
  cy.get('input').eq(1).type(dataPag);
  cy.get('input').eq(2).type(descricao);
  cy.get('input').eq(3).type(interessado);
  cy.get('input').eq(4).type(valor);
  cy.wait(1000);
});

// ========================================
// COMANDOS DE CONTAS
// ========================================

// Comando para criar uma conta
Cypress.Commands.add('criarConta', (nomeConta) => {
  cy.get('a').contains('Contas').click()
  cy.get('a').contains('Adicionar').click()
  cy.get('input[type="text"]').clear().type(nomeConta) 
  cy.get('button').contains('Salvar').click()
  cy.wait(1000)
})


// Comando para criar contas padrão
Cypress.Commands.add('criarContasPadrao', () => {
  cy.criarConta('Conta Corrente')
  cy.criarConta('Conta Poupança')
})



// ========================================
// COMANDOS DE DADOS DE TESTE
// ========================================

// Comando para gerar dados de movimentação


Cypress.Commands.add('criarELogarUsuario', () => {
  const timestamp = Date.now();
  const usuario = {
    nome: `Usuario ${timestamp}`,
    email: `teste${timestamp}@teste.com`,
    senha: '123456'
  };

  // Cadastrar usuário
  cy.visit('https://seubarriga.wcaquino.me/cadastro');
  cy.get('input[placeholder="Nome"]').type(usuario.nome);
  cy.get('input[placeholder="Email"]').type(usuario.email);
  cy.get('input[placeholder="Password"]').type(usuario.senha);
  cy.get('input[type="submit"], button').contains('Cadastrar').click();

  // Fazer login
  cy.get('input[placeholder="Email"]').type(usuario.email);
  cy.get('input[placeholder="Password"]').type(usuario.senha);
  cy.get('button').contains('Entrar').click();
});


// ========================================
// COMANDOS DE SETUP COMPLETO
// ========================================

// Comando para criar usuário e contas
Cypress.Commands.add('setupCompleto', () => {
  cy.setupUsuarioCompleto()
  cy.criarContasPadrao()
})