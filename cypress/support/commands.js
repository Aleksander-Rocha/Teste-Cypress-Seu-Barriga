
// Comando para verificar se está na página de login
Cypress.Commands.add('verificarPaginaLogin', () => {
  cy.url().should('include', '/login')
  cy.title().should('contain', 'Log in')
  cy.get('input[placeholder="Email"]').should('be.visible')
  cy.get('input[placeholder="Password"]').should('be.visible')
  cy.get('button').contains('Entrar').should('be.visible')
})

// Comando para verificar se está na página de cadastro
Cypress.Commands.add('verificarPaginaCadastro', () => {
  cy.url().should('include', '/cadastro')
  cy.title().should('contain', 'Novo Usuário')
  cy.get('input[placeholder="Nome"]').should('be.visible')
  cy.get('input[placeholder="Email"]').should('be.visible')
  cy.get('input[placeholder="Password"]').should('be.visible')
})

// Comando para verificar mensagens de erro/sucesso
Cypress.Commands.add('verificarMensagem', (tipo, texto) => {
  const seletores = [
    '.alert',
    '.error', 
    '.success', 
    '.message',
    '.notification',
    '[class*="alert"]',
    '[class*="error"]',
    '[class*="success"]'
  ]
  
  seletores.forEach(seletor => {
    cy.get('body').then($body => {
      if ($body.find(seletor).length > 0) {
        cy.get(seletor).should('be.visible')
        if (texto) {
          cy.get(seletor).should('contain.text', texto)
        }
      }
    })
  })
})

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
// COMANDOS DE MOVIMENTAÇÃO
// ========================================

// Comando para navegar para criar movimentação
Cypress.Commands.add('irParaMovimentacao', () => {
  cy.get('a').contains('Criar Movimentação').click()
  cy.url().should('include', '/movimentacao')
  cy.title().should('contain', 'Movimentações')
})

// Comando para criar movimentação completa
Cypress.Commands.add('criarMovimentacao', (dados) => {
  cy.irParaMovimentacao()
  
  // Selecionar tipo
  cy.get('select').first().select(dados.tipo)
  
  // Preencher campos
  cy.get('input').eq(0).type(dados.dataMovimentacao)
  cy.get('input').eq(1).type(dados.dataPagamento)
  cy.get('input').eq(2).type(dados.descricao)
  cy.get('input').eq(3).type(dados.interessado)
  cy.get('input').eq(4).type(dados.valor)
  
  // Selecionar conta
  cy.get('select').eq(1).select(dados.conta)
  
  // Selecionar situação
  if (dados.situacao === 'Pago') {
    cy.get('input[type="radio"]').first().check()
  } else {
    cy.get('input[type="radio"]').last().check()
  }
  
  // Salvar
  cy.get('button').contains('Salvar').click()
  cy.wait(1000)
})

// Comando para criar múltiplas movimentações
Cypress.Commands.add('criarMovimentacoes', (listaMovimentacoes) => {
  listaMovimentacoes.forEach(movimentacao => {
    cy.criarMovimentacao(movimentacao)
  })
})

// ========================================
// COMANDOS DE VALIDAÇÃO
// ========================================

// Comando para testar campo com valores inválidos
Cypress.Commands.add('testarCampoInvalido', (seletor, valoresInvalidos) => {
  valoresInvalidos.forEach(valor => {
    cy.get(seletor).clear().type(valor)
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)
    cy.url().should('include', '/movimentacao')
  })
})

// ========================================
// COMANDOS DE DADOS DE TESTE
// ========================================

// Comando para gerar dados de movimentação
Cypress.Commands.add('gerarDadosMovimentacao', (overrides = {}) => {
  const defaults = {
    tipo: 'Receita',
    dataMovimentacao: '01/12/2024',
    dataPagamento: '01/12/2024',
    descricao: 'Movimentação Teste',
    interessado: 'Interessado Teste',
    valor: '100.00',
    conta: 1,
    situacao: 'Pago'
  }
  
  return { ...defaults, ...overrides }
})

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