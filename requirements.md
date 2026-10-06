# Automação de Testes — PagBrasil (Playwright)

> Este documento reflete o **estado real** da automação neste repositório. Cada item
> indica o que está **implementado**, **parcial** ou **ausente** — não é uma lista de
> requisitos aspiracionais.

## 1. Visão geral

Automação E2E do site da PagBrasil (`https://www.pagbrasil.com/pt-br`) com
**Playwright + TypeScript**, executada **contra o site real** (não há fixtures locais
nem servidor próprio).

| Item | Valor |
|---|---|
| Framework | Playwright `1.63.0` |
| Linguagem | TypeScript `7.0.2` (compilador nativo) |
| Runtime | Node.js LTS |
| Logging | `winston` `3.19.0` + `moment-timezone` `0.6.5` |
| BDD | `playwright-bdd` `9.2.1` (infra apenas — sem cenários) |
| Navegadores | Chromium, Firefox, WebKit, Mobile Safari (iPhone 12) |
| Alvo | Site de produção (requer internet) |

## 2. Estrutura real

```
PagBrasil-playwright/
├── .github/workflows/playwright.yml   # CI (GitHub Actions)
├── playwright.config.ts               # baseURL, 4 projetos, reporters
├── tsconfig.json                      # typecheck (noEmit)
├── package.json
├── requirements.md                    # este documento
├── README.md
└── src/
    ├── config/site.ts                 # FORM_FIELD_IDS (mapeamento de campos)
    ├── fixtures/pagesFixture.ts       # fixtures POM + Given/When/Then (BDD)
    ├── logging/                       # logs gerados (ignorados no git)
    ├── pages/                         # Page Objects
    │   ├── BasePage.ts                # navegação, log, self-healing
    │   ├── HomePage.ts
    │   ├── QuemSomosPage.ts
    │   ├── SuportePage.ts
    │   ├── EnglishHomePage.ts
    │   └── AboutUsPage.ts
    ├── testdata/                      # massas estáticas (JSON)
    ├── tests/e2e/                     # 5 specs (home + 4 cenários)
    ├── utils/
    │   ├── LoggerUtil.ts              # winston, fuso America/Sao_Paulo
    │   └── SelfHealingUtil.ts         # findValidElement
    └── api/                            # vazio — reservado para testes de API
```

## 3. Como executar

```bash
npm install
npx playwright install          # instala os 4 navegadores
npm test                        # executa todos os projetos
npm run typecheck               # tsc --noEmit
npx playwright show-report      # abre o relatório HTML
```

## 4. Cenários implementados

| Arquivo | Cenário | Testes | Dados |
|---|---|---|---|
| `home.spec.ts` | Home PT: carregamento, busca/CTA e navegação CTA → suporte | 3 | — |
| `cenario-01-nossas-solucoes.spec.ts` | Submenu "Nossas soluções" (itens presentes e descontinuados) | 6 | `solucoes.json` |
| `cenario-02-quem-somos.spec.ts` | Quem Somos: busca, linha do tempo, selo GPTW e cidades | 4 | `quemSomos.json` |
| `cenario-03-alteracao-idioma.spec.ts` | Alteração de idioma PT → EN | 1 | `idiomas.json` |
| `cenario-04-fale-com-especialista.spec.ts` | Suporte: opções de atendimento e campos obrigatórios | 3 | `especialista.json`, `opcoesSuporte.json` |

Total: **17 testes por navegador × 4 navegadores = 68 execuções**.

## 5. Estado por funcionalidade (requisitos originais)

| # | Funcionalidade | Status | Observação |
|---|---|---|---|
| 2.1 | Page Object Model (POM) | ✅ Implementado | `BasePage` + 5 Page Objects, injetados por fixture |
| 2.2 | Testes orientados a dados | ✅ Implementado | Massas em `src/testdata/*.json` |
| 2.3 | Logging | ✅ Implementado | `winston`, arquivos em `src/logging/` + console |
| 2.4 | Mecanismo de retry | 🟡 Parcial | `retries: 0`; retry de CI está comentado |
| 2.5 | Self-healing | 🟡 Parcial | `SelfHealingUtil` + `openSolucoesMenuSelfHealing`, mas **nenhum spec o usa** |
| 2.6 | Testes cross-browser | ✅ Implementado | Chromium, Firefox, WebKit, Mobile Safari |
| 2.7 | Múltiplos ambientes | ⛔ Ausente | `baseURL` fixo (produção); sem seleção por ambiente |
| 2.8 | Criptografia de senha | ⛔ Ausente | Sem cenário de login/credenciais |
| 2.9 | Qualidade de código | 🟡 Parcial | Apenas `tsc --noEmit`; sem ESLint/Prettier |
| 2.10 | Integração CI/CD | ✅ Implementado | `.github/workflows/playwright.yml` |
| 2.11 | Utilitários reutilizáveis | ✅ Implementado | `BasePage`, `LoggerUtil`, `SelfHealingUtil` |
| 2.12 | Geração de dados | ⛔ Ausente | Massas estáticas (sem faker/geradores) |
| 2.13 | Testes em paralelo | ✅ Implementado | `fullyParallel: true` |
| 2.14 | Mocking/teste de API | ⛔ Ausente | `src/api/` vazio |
| — | BDD (Cucumber/Gherkin) | 🟡 Parcial | `Given/When/Then` exportados, mas sem `.feature`/steps |

## 6. Estado atual de execução

```
npm test          → 56 passed, 12 skipped, 0 failed
npm run typecheck → exit 0
```

## 7. Restrições conhecidas

- **Executa contra o site real** (produção): requer internet e depende do markup atual
  da página; mudanças no site podem quebrar seletores.
- **Mobile Safari (iPhone 12)**: 12 testes são **pulados** (`test.skip(isMobile)`) porque
  o layout mobile oculta os elementos testados — lupa, CTA "Fale com um especialista",
  selo GPTW, cidades do rodapé e o mega-menu (que abre por **hover** no desktop).
- **Seletor de idioma EN** leva a `/?preferred_language=en`, não a `/about-us/`.
- **Massas de teste são estáticas** (`src/testdata`).
- Campos do formulário do especialista são validados como configurados
  (`aria-required="true"`), sem submissão real do formulário.

## 8. Pendências (para aderência total ao enunciado original)

1. Múltiplos ambientes (configuração de `baseURL` por variável de ambiente).
2. Criptografia de credenciais (quando houver cenário com login).
3. Geração dinâmica de dados de teste.
4. Mocking/teste de API (`src/api`).
5. ESLint + Prettier e gate de lint no CI.
6. Cenários BDD (`.feature`) exercitando a infra do `playwright-bdd`.
7. Cenário real que exercite o self-healing.
8. Definir `retries` no CI para mitigar flakiness do site real.
