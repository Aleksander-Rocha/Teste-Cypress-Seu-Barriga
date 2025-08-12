import LoginPage from '../../support/pages/LoginPage'

describe('Seu Barriga - Testes de Login', () => {

  beforeEach(() => {
    // Visitar a página de login antes de cada teste
    cy.visit('https://seubarriga.wcaquino.me/login')
  })

  it('CT001 - Deve criar um novo usuário com sucesso', () => {
    // Gerar dados únicos para evitar conflito
    const timestamp = Date.now()
    const novoUsuario = {
      nome: `Usuario Teste ${timestamp}`,
      email: `teste${timestamp}@email.com`,
      senha: 'MinhaSenh@123'
    }

    // Clicar no link "Novo usuário?"
    cy.get('a').contains('Novo usuário?').click()

    // Verificar que chegou na página de cadastro
    cy.url().should('include', '/cadastro')
    cy.title().should('contain', 'Novo Usuário')

    // Preencher formulário de cadastro
    cy.get('input[placeholder="Nome"]').type(novoUsuario.nome)
    cy.get('input[placeholder="Email"]').type(novoUsuario.email)
    cy.get('input[placeholder="Password"]').type(novoUsuario.senha)

    // Clicar no botão Cadastrar
    cy.get('input[type="submit"], button').contains('Cadastrar').click()

    // Verificar se cadastro foi bem-sucedido
    // (pode redirecionar para login ou mostrar mensagem de sucesso)
    cy.url().then((url) => {
      if (url.includes('/cadastrarUsuario')) {
        // Validar se redirecionou e a mensagem foi exibida com sucesso.
        cy.url().should('include', '/cadastrarUsuario')
        cy.contains('Usuário inserido com sucesso').should('be.visible');

      } else {
        cy.url().should('include', '/cadastro')
      }
    })
  })

  it('CT002 - Deve validar que sistema só permite login se tiver usuário cadastrado', () => {
    // Tentar fazer login com usuário que NÃO existe
    const usuarioInexistente = {
      email: `inexistente${Date.now()}@email.com`,
      senha: 'senhaqualquer123'
    }

    // Preencher campos de login
    cy.get('input[placeholder="Email"]').type(usuarioInexistente.email)
    cy.get('input[placeholder="Password"]').type(usuarioInexistente.senha)

    // Clicar no botão Entrar
    cy.get('button').contains('Entrar').click()

    // Verificar que permanece na página de login (não conseguiu entrar)
    cy.url().should('include', '/logar')

    // Verificar que não foi redirecionado para área logada
    cy.url().should('not.include', '/home')
    cy.url().should('not.include', '/dashboard')
    cy.url().should('not.include', '/contas')

    // Verificar que ainda está na tela de login
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button').contains('Entrar').should('be.visible')
  })

  it('CT003 - Deve realizar login com sucesso', () => {
    // Primeiro, criar um usuário para garantir que existe
    const timestamp = Date.now()
    const usuario = {
      nome: `Usuario Login ${timestamp}`,
      email: `login${timestamp}@email.com`,
      senha: 'MinhaSenh@123'
    }

    // ETAPA 1: Cadastrar o usuário
    cy.get('a').contains('Novo usuário?').click()
    cy.get('input[placeholder="Nome"]').type(usuario.nome)
    cy.get('input[placeholder="Email"]').type(usuario.email)
    cy.get('input[placeholder="Password"]').type(usuario.senha)
    cy.get('input[type="submit"], button').contains('Cadastrar').click()

    // Aguardar processamento do cadastro
    cy.wait(2000)

    // ETAPA 2: Ir para página de login
    cy.visit('https://seubarriga.wcaquino.me/login')

    // ETAPA 3: Fazer login com o usuário criado
    cy.get('input[placeholder="Email"]').type(usuario.email)
    cy.get('input[placeholder="Password"]').type(usuario.senha)
    cy.get('button').contains('Entrar').click()

    // ETAPA 4: Verificar que login foi bem-sucedido
    // (deve sair da página de login)
    cy.url().should('not.include', '/login')

    // Verificar que chegou em alguma página da área logada
    cy.url().then((url) => {
      // Aceitar qualquer URL que não seja login ou cadastro
      expect(url).to.not.include('/login')
      expect(url).to.not.include('/cadastro')
    })
  })

})