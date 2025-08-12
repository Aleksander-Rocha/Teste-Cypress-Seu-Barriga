describe('Seu Barriga - Testes de Contas', () => {
  
  beforeEach(() => {
    // Criar usuário único para cada teste
    const timestamp = Date.now()
    const usuario = {
      nome: `Usuario ${timestamp}`,
      email: `teste${timestamp}@teste.com`,
      senha: '123456'
    }

    // Cadastrar usuário
    cy.visit('https://seubarriga.wcaquino.me/cadastro')
    cy.get('input[placeholder="Nome"]').type(usuario.nome)
    cy.get('input[placeholder="Email"]').type(usuario.email)
    cy.get('input[placeholder="Password"]').type(usuario.senha)
    cy.get('input[type="submit"], button').contains('Cadastrar').click()

    // Fazer login
    cy.get('input[placeholder="Email"]').type(usuario.email)
    cy.get('input[placeholder="Password"]').type(usuario.senha)
    cy.get('button').contains('Entrar').click()
  })

  it('CT001 - Adicionar no mínimo 2 contas', () => {
    // Adicionar primeira conta
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar mensagem de sucesso
    cy.get('body').should('contain', 'Conta adicionada com sucesso')

    // Adicionar segunda conta
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Poupança')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar mensagem de sucesso
    cy.get('body').should('contain', 'Conta adicionada com sucesso')

  })

  it('CT002 - Listar todas as contas', () => {
    // Adicionar algumas contas primeiro
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Teste 1')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Teste 2')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Teste 3')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Navegar para listagem de contas
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Listar').click()

    // Verificar que está na página de listagem
    cy.url().should('include', '/contas')

    // Verificar que as contas aparecem na tabela
    cy.get('table').should('be.visible')
    cy.get('table').should('contain', 'Conta Teste 1')
    cy.get('table').should('contain', 'Conta Teste 2')
    cy.get('table').should('contain', 'Conta Teste 3')

    // Verificar estrutura da tabela
    cy.get('table thead').should('contain', 'Conta')
    cy.get('table thead').should('contain', 'Ações')
  })

  it('CT003 - Alterar o nome das contas', () => {
    // Adicionar conta para alterar
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Original')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar que a conta original existe
    cy.get('table').should('contain', 'Conta Original')

    // Procurar e clicar no ícone de editar (geralmente um ícone de lápis ou link "Editar")
    cy.get('table').contains('tr', 'Conta Original').within(() => {
      // Tentar diferentes seletores para o botão de editar
      cy.get('a').first().click() // Primeiro link na linha (geralmente editar)
    })

    // Verificar se chegou na página de edição
    cy.url().should('include', '/editarConta')

    // Alterar o nome da conta
    cy.get('input[type="text"]').clear().type('Conta Alterada')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar mensagem de sucesso
    cy.get('body').should('contain', 'Conta alterada com sucesso')

    // Voltar para listagem e verificar alteração
    cy.get('table').should('contain', 'Conta Alterada')
  })

  it('CT004 - Fluxo alternativo: excluir conta vinculada a movimentação', () => {
    // Adicionar conta
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta com Movimentação')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Criar uma movimentação para esta conta
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('01/12/2024') // Data da Movimentação
    cy.get('input').eq(1).type('01/12/2024') // Data do Pagamento
    cy.get('input').eq(2).type('Salário Dezembro') // Descrição
    cy.get('input').eq(3).type('Empresa XYZ') // Interessado
    cy.get('input').eq(4).type('5000.00') // Valor
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Tentar excluir a conta que tem movimentação
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Listar').click()

    cy.get('a[href*="/removerConta"]').click();

    cy.contains('Conta em uso na movimentações').should('be.visible');

  })

  it('CT005 - Fluxo alternativo: adicionar conta com nome já existente', () => {
    // Adicionar primeira conta
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Duplicada')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar que foi criada com sucesso
    cy.get('body').should('contain', 'Conta adicionada com sucesso')

    // Tentar adicionar segunda conta com o mesmo nome
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Duplicada')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar que o sistema impede a duplicação
    cy.get('body').should('contain', 'Já existe uma conta com esse nome!')

  })

})