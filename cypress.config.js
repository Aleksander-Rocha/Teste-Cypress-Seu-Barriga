const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // URL base da aplicação
    baseUrl: 'https://seubarriga.wcaquino.me/login',
    
    // Configurações de viewport
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Configurações de evidências
    video: true,
    screenshotOnRunFailure: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Configuração do relatório
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Relatório de Testes - Sistema Financeiro'
    },
    
    // Padrão de arquivos de teste
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    setupNodeEvents(on, config) {
      // Plugin do relatório
      require('cypress-mochawesome-reporter/plugin')(on)
      
      return config
    },
    
    // Variáveis de ambiente
    env: {
      // Configurações específicas do ambiente
      apiUrl: 'https://seubarriga.wcaquino.me/login'
    }
  }
})
