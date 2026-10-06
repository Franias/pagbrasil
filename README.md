# Framework Playwright

Este repositório contém a configuração de um framework Playwright para testes automatizados. A estrutura do framework é a seguinte:

## Estrutura de Pastas do Projeto

```
Acceptance-test-playwright/
├── .gitignore
├── .github/
│   └── workflows/
│       └── pagbrasil-tests.yml
│   ├── src/
│   │   ├── mocks/
│   │   ├── steps/
│   │   └── support/
│   ├── pagbrasil/
│   │   ├── docs/
│   │   ├── features/
│   │   │   ├── e2e/
│   │   │   └── nao-funcionais/
│   │   ├── fixtures/
│   │   ├── reports/
│   │   └── src/
│   │       ├── api/
│   │       ├── mocks/
│   │       ├── steps/
│   │       └── support/
│   ├── package.json
│   └── tsconfig.json
├── backend/
├── frontend/
├── node_modules/
├── package.json
├── package-lock.json
├── requirements.md
└── README.md
```

## Descrição

- `.gitignore`: especifica arquivos intencionalmente não rastreados a serem ignorados pelo Git.
- `package.json` e `package-lock.json`: arquivos de pacote do Node.js que especificam as dependências do projeto.
- `requirements.md`: documento que descreve os requisitos do projeto.
- `README.md`: este arquivo, com a visão geral e as instruções de uso.
- `backend/`: API REST em Java + Spring Boot (aplicação de biblioteca).
- `frontend/`: interface em React (Vite) da aplicação de biblioteca.

### `.github`

- `.github/workflows/pagbrasil-tests.yml`: workflow do GitHub Actions para integração contínua (CI).

### `node_modules`

- Diretório que contém os módulos Node.js instalados pelo npm.


## Uso

- Clone o repositório e instale as dependências com `npm install`.
- Rode os testes com `npm test`.
- Veja os relatórios de teste no diretório `acceptance-tests/pagbrasil/reports`.
- Explore os arquivos de código-fonte para ver a implementação em detalhes.

Passos de instalação por projeto:

```bash
# Testes da biblioteca
cd PagBrasil-playwright
npm install
npx playwright install chromium
npm test

# Desafio PagBrasil (offline)
cd PagBrasil-playwright
npm install
npx playwright install chromium
npm test
```

## Contribuição

Contribuições são bem-vindas! Siga o estilo de código e as diretrizes estabelecidas. Se encontrar algum problema ou tiver sugestões de melhoria, fique à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
