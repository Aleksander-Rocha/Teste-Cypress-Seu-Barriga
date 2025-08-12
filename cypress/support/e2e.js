// Importar comandos customizados
import './commands'

// Importar plugin do relatório
import 'cypress-mochawesome-reporter/register'

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevenir que erros JavaScript não tratados quebrem os testes
  return false
})

// Configuração para screenshots em falhas
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `${runnable.parent.title} -- ${test.title} (failed).png`
    cy.screenshot(screenshot)
  }
})

// Configurações antes de cada teste
beforeEach(() => {
  // Limpar cookies e localStorage
  cy.clearCookies()
  cy.clearLocalStorage()
  
  // Configurar viewport padrão
  cy.viewport(1280, 720)
})