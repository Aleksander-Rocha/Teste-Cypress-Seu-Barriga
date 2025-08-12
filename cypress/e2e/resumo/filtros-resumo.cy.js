describe('Seu Barriga - Testes de Resumo Mensal', () => {
  
  beforeEach(() => {
    cy.setupCompleto()
  })

  it('CT001 - Utilizar os filtros para exibir as movimentações criadas', () => {
    // Criar movimentações em meses diferentes
    function criarMovimentacao({ tipo, dataMov, dataPag, descricao, interessado, valor, conta, situacao }) {
  cy.contains('Criar Movimentação').click();
  cy.get('select').eq(0).select(tipo);
  cy.get('input').eq(0).type(dataMov);
  cy.get('input').eq(1).type(dataPag);
  cy.get('input').eq(2).type(descricao);
  cy.get('input').eq(3).type(interessado);
  cy.get('input').eq(4).type(valor);
  cy.get('select').eq(1).select(conta);

  // Marcar o checkbox de situação
  if (situacao === 'Pago') {
    cy.get('#status_pago').check();
  } else if (situacao === 'Pendente') {
    cy.get('#status_pendente').check();
  }

  cy.contains('Salvar').click();
  cy.wait(1000);
}

[
  {
    tipo: 'Receita',
    dataMov: '15/12/2024',
    dataPag: '15/12/2024',
    descricao: 'Salário Dezembro',
    interessado: 'Empresa',
    valor: '3000.00',
    conta: 'Conta Corrente',
    situacao: 'Pago'
  },
  {
    tipo: 'Despesa',
    dataMov: '15/01/2025',
    dataPag: '15/01/2025',
    descricao: 'Conta de Luz Janeiro',
    interessado: 'Companhia Elétrica',
    valor: '200.00',
    conta: 'Conta Corrente',
    situacao: 'Pago'
  },
  {
    tipo: 'Receita',
    dataMov: '15/02/2025',
    dataPag: '15/02/2025',
    descricao: 'Freelance Fevereiro',
    interessado: 'Cliente',
    valor: '1500.00',
    conta: 'Conta Corrente',
    situacao: 'Pago'
  }
].forEach(mov => criarMovimentacao(mov));

    // Testar filtros no Resumo Mensal
    cy.get('a').contains('Resumo Mensal').click()

    // Filtrar por Dezembro/2024
    cy.get('select').eq(0).select('12')
    cy.get('select').eq(1).select('2024')
    cy.get('input[type="submit"]').click()
    cy.get('table').should('contain', 'Salário Dezembro')

  })

  it('CT002 - Excluir uma movimentação', () => {

    function criarMovimentacao({ tipo, dataMov, dataPag, descricao, interessado, valor, conta, situacao }) {
  cy.contains('Criar Movimentação').click();
  cy.get('select').eq(0).select(tipo);
  cy.get('input').eq(0).type(dataMov);
  cy.get('input').eq(1).type(dataPag);
  cy.get('input').eq(2).type(descricao);
  cy.get('input').eq(3).type(interessado);
  cy.get('input').eq(4).type(valor);
  cy.get('select').eq(1).select(conta);

  if (situacao === 'Pago') {
    cy.get('#status_pago').check();
  } else if (situacao === 'Pendente') {
    cy.get('#status_pendente').check();
  }

  cy.contains('Salvar').click();
  cy.wait(1000);
}

[
  {
    tipo: 'Despesa',
    dataMov: '02/12/2024',
    dataPag: '02/12/2024',
    descricao: 'Movimentação para Excluir',
    interessado: 'Teste',
    valor: '300.00',
    conta: 'Conta Corrente',
    situacao: 'Pago'
  }
].forEach(mov => criarMovimentacao(mov));


    // Ir para Resumo Mensal
    cy.get('a').contains('Resumo Mensal').click()
    cy.get('select').eq(0).select('12')
    cy.get('select').eq(1).select('2024')
    cy.get('input[type="submit"]').click()

    cy.get('table').should('contain', 'Movimentação para Excluir')

  cy.get('table').contains('tr', 'Movimentação para Excluir').within(() => {
  cy.get('a').last().click()
})

    cy.wait(1000)

    // Verificar que a movimentação foi excluída
    cy.get('table').should('not.contain', 'Movimentação para Excluir')

  })

})