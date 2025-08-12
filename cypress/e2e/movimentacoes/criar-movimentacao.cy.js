describe('Seu Barriga - Testes de Movimentação', () => {
  
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

    // Criar 2 contas para os testes
    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('a').contains('Contas').click()
    cy.get('a').contains('Adicionar').click()
    cy.get('input[type="text"]').type('Conta Poupança')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)
  })

  it('CT001 - Criar no mínimo 2 movimentações (Receita e Despesa)', () => {
    // Criar movimentação tipo Receita
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('01/12/2024') // Data da Movimentação
    cy.get('input').eq(1).type('01/12/2024') // Data do Pagamento
    cy.get('input').eq(2).type('Salário Dezembro') // Descrição
    cy.get('input').eq(3).type('Empresa XYZ') // Interessado
    cy.get('input').eq(4).type('5000.00') // Valor
    cy.get('select').eq(1).select('Conta Corrente') // Conta
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Criar movimentação tipo Despesa
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Despesa')
    cy.get('input').eq(0).type('02/12/2024') // Data da Movimentação
    cy.get('input').eq(1).type('02/12/2024') // Data do Pagamento
    cy.get('input').eq(2).type('Conta de Luz') // Descrição
    cy.get('input').eq(3).type('Companhia Elétrica') // Interessado
    cy.get('input').eq(4).type('150.00') // Valor
    cy.get('select').eq(1).select('Conta Corrente') // Conta
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar no resumo mensal
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('12')
    cy.get('select').eq(1).select('2024')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Salário Dezembro')
    cy.get('table').should('contain', 'Conta de Luz')
  })

  it('CT002 - Criar no mínimo 2 movimentações para cada conta', () => {
    // 2 movimentações para Conta Corrente
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('01/12/2024')
    cy.get('input').eq(1).type('01/12/2024')
    cy.get('input').eq(2).type('Movimentação 1 - Conta Corrente')
    cy.get('input').eq(3).type('Teste 1')
    cy.get('input').eq(4).type('1000.00')
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Despesa')
    cy.get('input').eq(0).type('02/12/2024')
    cy.get('input').eq(1).type('02/12/2024')
    cy.get('input').eq(2).type('Movimentação 2 - Conta Corrente')
    cy.get('input').eq(3).type('Teste 2')
    cy.get('input').eq(4).type('500.00')
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // 2 movimentações para Conta Poupança
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('03/12/2024')
    cy.get('input').eq(1).type('03/12/2024')
    cy.get('input').eq(2).type('Movimentação 1 - Conta Poupança')
    cy.get('input').eq(3).type('Teste 3')
    cy.get('input').eq(4).type('2000.00')
    cy.get('select').eq(1).select('Conta Poupança')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Despesa')
    cy.get('input').eq(0).type('04/12/2024')
    cy.get('input').eq(1).type('04/12/2024')
    cy.get('input').eq(2).type('Movimentação 2 - Conta Poupança')
    cy.get('input').eq(3).type('Teste 4')
    cy.get('input').eq(4).type('300.00')
    cy.get('select').eq(1).select('Conta Poupança')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar no resumo mensal
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('12')
    cy.get('select').eq(1).select('2024')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Movimentação 1 - Conta Corrente')
    cy.get('table').should('contain', 'Movimentação 2 - Conta Corrente')
    cy.get('table').should('contain', 'Movimentação 1 - Conta Poupança')
    cy.get('table').should('contain', 'Movimentação 2 - Conta Poupança')
  })

  it('CT003 - Criar no mínimo 2 movimentações para cada situação', () => {
    // 2 movimentações com situação "Pago"
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('01/12/2024')
    cy.get('input').eq(1).type('01/12/2024')
    cy.get('input').eq(2).type('Movimentação Paga 1')
    cy.get('input').eq(3).type('Teste Pago 1')
    cy.get('input').eq(4).type('1000.00')
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('input[type="radio"]').eq(0).check()
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('select').eq(0).select('Despesa')
    cy.get('input').eq(0).type('02/12/2024')
    cy.get('input').eq(1).type('02/12/2024')
    cy.get('input').eq(2).type('Movimentação Paga 2')
    cy.get('input').eq(3).type('Teste Pago 2')
    cy.get('input').eq(4).type('500.00')
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('input[type="radio"]').eq(0).check()
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // 2 movimentações com situação "Pendente"
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('03/12/2024')
    cy.get('input').eq(1).type('03/12/2024')
    cy.get('input').eq(2).type('Movimentação Pendente 1')
    cy.get('input').eq(3).type('Teste Pendente 1')
    cy.get('input').eq(4).type('800.00')
    cy.get('select').eq(1).select('Conta Poupança')
    cy.get('input[type="radio"]').eq(1).check()
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('select').eq(0).select('Despesa')
    cy.get('input').eq(0).type('04/12/2024')
    cy.get('input').eq(1).type('04/12/2024')
    cy.get('input').eq(2).type('Movimentação Pendente 2')
    cy.get('input').eq(3).type('Teste Pendente 2')
    cy.get('input').eq(4).type('200.00')
    cy.get('select').eq(1).select('Conta Poupança')
    cy.get('input[type="radio"]').eq(1).check()
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar no resumo mensal
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('12')
    cy.get('select').eq(1).select('2024')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Movimentação Paga 1')
    cy.get('table').should('contain', 'Movimentação Paga 2')
    cy.get('table').should('contain', 'Movimentação Pendente 1')
    cy.get('table').should('contain', 'Movimentação Pendente 2')
  })

  it('CT004 - Criar no mínimo 2 movimentações para meses diferentes', () => {
    // Movimentação em Dezembro/2024
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('15/12/2024')
    cy.get('input').eq(1).type('15/12/2024')
    cy.get('input').eq(2).type('Movimentação Dezembro 2024')
    cy.get('input').eq(3).type('Teste Dezembro')
    cy.get('input').eq(4).type('1500.00')
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Movimentação em Janeiro/2025
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('15/01/2025')
    cy.get('input').eq(1).type('15/01/2025')
    cy.get('input').eq(2).type('Movimentação Janeiro 2025')
    cy.get('input').eq(3).type('Teste Janeiro')
    cy.get('input').eq(4).type('2000.00')
    cy.get('select').eq(1).select('Conta Poupança')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Movimentação em Fevereiro/2025
    cy.get('select').eq(0).select('Despesa')
    cy.get('input').eq(0).type('15/02/2025')
    cy.get('input').eq(1).type('15/02/2025')
    cy.get('input').eq(2).type('Movimentação Fevereiro 2025')
    cy.get('input').eq(3).type('Teste Fevereiro')
    cy.get('input').eq(4).type('750.00')
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    // Verificar Dezembro/2024
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('12')
    cy.get('select').eq(1).select('2024')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Movimentação Dezembro 2024')

    // Verificar Janeiro/2025
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('Janeiro')
    cy.get('select').eq(1).select('2025')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Movimentação Janeiro 2025')
    
    // Verificar Fevereiro/2025
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('Fevereiro')
    cy.get('select').eq(1).select('2025')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Movimentação Fevereiro 2025')
  })

  it('CT005 - Fluxo alternativo: validar campos de data', () => {
    cy.get('a').contains('Criar Movimentação').click()

    // Tentar salvar sem preencher datas
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(2).type('Teste sem data') // Descrição
    cy.get('input').eq(3).type('Teste') // Interessado
    cy.get('input').eq(4).type('100.00') // Valor
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    
    // Verificar que permanece na página (não salvou)
    cy.url().should('include', '/salvarMovimentacao')

    const mensagens = [
    'Data da Movimentação é obrigatório',
    'Data do pagamento é obrigatório'
    ];

    mensagens.forEach(mensagem => {
    cy.contains(mensagem).should('be.visible');
    });


    // Testar data inválida
    cy.get('input').eq(0).clear().type('32/13/2024') // Data da Movimentação
    cy.get('input').eq(1).clear().type('32/13/2024') // Data do Pagamento
    cy.get('button').contains('Salvar').click()
    
    // Verificar que permanece na página (não salvou)
    cy.url().should('include', '/salvarMovimentacao')

    const mensagenssegunda = [
    'Data da Movimentação inválida (DD/MM/YYYY)',
    'Data da Movimentação deve ser menor ou igual à data atual',
    'Data do pagamento inválida (DD/MM/YYYY)'
    ];

    mensagenssegunda.forEach(mensagem => {
    cy.contains(mensagem).should('be.visible');
    });

  })

  it('CT006 - Fluxo alternativo: validar campo valor', () => {
    cy.get('a').contains('Criar Movimentação').click()

    // Tentar salvar sem valor
    cy.get('select').eq(0).select('Receita')
    cy.get('input').eq(0).type('01/12/2024') // Data da Movimentação
    cy.get('input').eq(1).type('01/12/2024') // Data do Pagamento
    cy.get('input').eq(2).type('Teste sem valor') // Descrição
    cy.get('input').eq(3).type('Teste') // Interessado
    cy.get('select').eq(1).select('Conta Corrente')
    cy.get('button').contains('Salvar').click()
    
    // Verificar que permanece na página (não salvou)
    cy.url().should('include', '/salvarMovimentacao')

    // Testar valor zero
    cy.get('input').eq(4).clear().type('0') // Valor
    cy.get('button').contains('Salvar').click()
    cy.url().should('include', '/salvarMovimentacao')

    // Testar valor negativo
    cy.get('input').eq(4).clear().type('-100')
    cy.get('button').contains('Salvar').click()
    cy.url().should('include', '/salvarMovimentacao')

    // Testar texto no campo valor
    cy.get('input').eq(4).clear().type('abc')
    cy.get('button').contains('Salvar').click()
    cy.url().should('include', '/salvarMovimentacao')

    // Testar valor muito grande
    cy.get('input').eq(4).clear().type('99999999999999999')
    cy.get('button').contains('Salvar').click()
    
    // Verificar comportamento do sistema
    cy.url().should('include', '/salvarMovimentacao')
  })

})