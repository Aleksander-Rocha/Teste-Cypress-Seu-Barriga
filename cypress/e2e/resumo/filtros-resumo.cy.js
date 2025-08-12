// cypress/e2e/resumo-mensal/resumo-mensal.cy.js - VERSÃO REFATORADA
describe('Seu Barriga - Testes de Resumo Mensal', () => {

  beforeEach(() => {
    // Setup completo em uma linha
    cy.setupCompleto()
  })

  it('CT006 - Deve excluir primeira movimentação da lista', () => {
    // Criar movimentações de teste
    const movimentacoes = [
      cy.gerarDadosMovimentacao({
        tipo: 'Receita',
        dataMovimentacao: '05/07/2025',
        dataPagamento: '05/07/2025',
        descricao: 'Primeira Movimentação',
        interessado: 'Cliente 1',
        valor: '1000.00'
      }),
      cy.gerarDadosMovimentacao({
        tipo: 'Despesa',
        dataMovimentacao: '10/07/2025',
        dataPagamento: '10/07/2025',
        descricao: 'Segunda Movimentação',
        interessado: 'Fornecedor 2',
        valor: '500.00'
      })
    ]
    
    cy.criarMovimentacoes(movimentacoes)
    
    // Verificar estado inicial
    cy.aplicarFiltroResumo(6, 2025) // Julho 2025
    cy.contarMovimentacoes().should('eq', 2)
    
    // Excluir primeira movimentação
    cy.excluirPrimeiraMovimentacao()
    
    // Verificar que uma foi removida
    cy.aplicarFiltroResumo(6, 2025) // Recarregar filtro
    cy.contarMovimentacoes().should('eq', 1)
  })

 

})