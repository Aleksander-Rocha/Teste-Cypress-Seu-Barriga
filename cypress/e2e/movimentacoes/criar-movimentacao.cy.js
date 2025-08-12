describe('Seu Barriga - Testes de Movimentação', () => {
  
  beforeEach(() => {
    cy.setupCompleto()
  })

  it('CT001 - Criar no mínimo 2 movimentações (Receita e Despesa)', () => {
    // Criar movimentação tipo Receita
    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Receita')
    cy.criarMovimentacao(
      '01/12/2024',
      '01/12/2024',
      'Salário Dezembro',
      'Empresa XYZ',
      '5000.00'
      );
    cy.get('select').eq(1).select('Conta Corrente') // Conta
    cy.get('button').contains('Salvar').click()
    cy.wait(1000)

    cy.get('a').contains('Criar Movimentação').click()
    cy.get('select').eq(0).select('Despesa')
    cy.criarMovimentacao(
      '02/12/2024',
      '02/12/2024',
      'Conta de Luz',
      'Companhia Elétrica',
      '150.00'
      );
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
    function criarMovimentacao({ tipo, data, descricao, interessado, valor, conta }) {
  cy.contains('Criar Movimentação').click();
  cy.get('select').eq(0).select(tipo);
  cy.get('input').eq(0).type(data);
  cy.get('input').eq(1).type(data);
  cy.get('input').eq(2).type(descricao);
  cy.get('input').eq(3).type(interessado);
  cy.get('input').eq(4).type(valor);
  cy.get('select').eq(1).select(conta);
  cy.contains('Salvar').click();
  cy.wait(1000);
}

[
  { tipo: 'Receita', data: '01/12/2024', descricao: 'Movimentação 1 - Conta Corrente', interessado: 'Teste 1', valor: '1000.00', conta: 'Conta Corrente' },
  { tipo: 'Despesa', data: '02/12/2024', descricao: 'Movimentação 2 - Conta Corrente', interessado: 'Teste 2', valor: '500.00', conta: 'Conta Corrente' },
  { tipo: 'Receita', data: '03/12/2024', descricao: 'Movimentação 1 - Conta Poupança', interessado: 'Teste 3', valor: '2000.00', conta: 'Conta Poupança' },
  { tipo: 'Despesa', data: '04/12/2024', descricao: 'Movimentação 2 - Conta Poupança', interessado: 'Teste 4', valor: '300.00', conta: 'Conta Poupança' }
].forEach(mov => criarMovimentacao(mov));

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
    function criarMovimentacao({ tipo, data, descricao, interessado, valor, conta, situacao }) {
  cy.contains('Criar Movimentação').click();
  cy.get('select').eq(0).select(tipo);
  cy.get('input').eq(0).type(data);
  cy.get('input').eq(1).type(data);
  cy.get('input').eq(2).type(descricao);
  cy.get('input').eq(3).type(interessado);
  cy.get('input').eq(4).type(valor);
  cy.get('select').eq(1).select(conta);

  // Seleciona o radio: índice 0 para Pago, 1 para Pendente
  cy.get('input[type="radio"]').eq(situacao === 'Pago' ? 0 : 1).check();

  cy.contains('Salvar').click();
  cy.wait(1000);
}

[
  { tipo: 'Receita', data: '01/12/2024', descricao: 'Movimentação Paga 1', interessado: 'Teste Pago 1', valor: '1000.00', conta: 'Conta Corrente', situacao: 'Pago' },
  { tipo: 'Despesa', data: '02/12/2024', descricao: 'Movimentação Paga 2', interessado: 'Teste Pago 2', valor: '500.00', conta: 'Conta Corrente', situacao: 'Pago' },
  { tipo: 'Receita', data: '03/12/2024', descricao: 'Movimentação Pendente 1', interessado: 'Teste Pendente 1', valor: '800.00', conta: 'Conta Poupança', situacao: 'Pendente' },
  { tipo: 'Despesa', data: '04/12/2024', descricao: 'Movimentação Pendente 2', interessado: 'Teste Pendente 2', valor: '200.00', conta: 'Conta Poupança', situacao: 'Pendente' }
].forEach(mov => criarMovimentacao(mov));



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
    function criarMovimentacao({ tipo, data, descricao, interessado, valor, conta }) {
  cy.contains('Criar Movimentação').click();
  cy.get('select').eq(0).select(tipo);
  cy.get('input').eq(0).type(data);
  cy.get('input').eq(1).type(data);
  cy.get('input').eq(2).type(descricao);
  cy.get('input').eq(3).type(interessado);
  cy.get('input').eq(4).type(valor);
  cy.get('select').eq(1).select(conta);
  cy.contains('Salvar').click();
  cy.wait(1000);
}

[
  {
    tipo: 'Receita',
    data: '15/12/2024',
    descricao: 'Movimentação Dezembro 2024',
    interessado: 'Teste Dezembro',
    valor: '1500.00',
    conta: 'Conta Corrente'
  },
  {
    tipo: 'Receita',
    data: '15/01/2025',
    descricao: 'Movimentação Janeiro 2025',
    interessado: 'Teste Janeiro',
    valor: '2000.00',
    conta: 'Conta Poupança'
  },
  {
    tipo: 'Despesa',
    data: '15/02/2025',
    descricao: 'Movimentação Fevereiro 2025',
    interessado: 'Teste Fevereiro',
    valor: '750.00',
    conta: 'Conta Corrente'
  }
].forEach(mov => criarMovimentacao(mov));

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