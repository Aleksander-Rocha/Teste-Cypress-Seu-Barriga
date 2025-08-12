Testes Automatizados - Seu Barriga
Projeto de automação de testes para o site Seu Barriga usando Cypress.

O que tem aqui:
Este projeto testa as principais funcionalidades do sistema:

• Login e Logout - Cadastro de usuário e autenticação

• Gestão de Contas - Criar, listar, editar e excluir contas

• Movimentações - Criar receitas e despesas, validações de campos

• Resumo Mensal - Filtros e exclusão de movimentações

Como rodar:

Você precisa ter o Node.js instalado.
Bash


# Instalar as dependências
npm install

# Abrir o Cypress (interface gráfica)
npm run cy:open

# Rodar todos os testes (linha de comando)
npm run cy:run


Estrutura dos testes

cypress/e2e/
├── auth/
│   ├── login.cy.js          # 3 testes de login
│   └── logout.cy.js         # 1 teste de logout
├── contas/
│   └── contas.cy.js         # 5 testes de contas
└── movimentacao/
    └── movimentacao.cy.js   # 6 testes de movimentação


Scripts disponíveis

• npm run cy:open - Abre a interface do Cypress

• npm run cy:run - Executa todos os testes

• npm run test - Mesmo que cy:run

Observações

• Cada teste cria um usuário único para evitar conflitos

• Os testes são independentes e podem rodar em qualquer ordem

• Videos e screenshots são salvos automaticamente quando há falhas


Tecnologias:

• Cypress 13.x

• Node.js

• JavaScript