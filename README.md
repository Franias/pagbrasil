# PagBrasil — Automação de Testes (Playwright)

Automação E2E do site da PagBrasil com **Playwright + TypeScript**.
Os testes são executados **contra o site real** (`https://www.pagbrasil.com/pt-br`),
portanto exigem acesso à internet.

Para o detalhamento de funcionalidades e pendências, veja [`requirements.md`](./requirements.md).

## Pré-requisitos

- Node.js LTS
- Acesso à internet (os testes navegam no site de produção)

## Instalação e execução

```bash
npm install
npx playwright install        # instala os navegadores (Chromium, Firefox, WebKit)
npm test                      # executa a suíte em todos os projetos
npm run typecheck             # verificação de tipos (tsc --noEmit)
npx playwright show-report    # abre o relatório HTML
```

## Estrutura do projeto

```
PagBrasil-playwright/
├── .github/workflows/playwright.yml   # CI (GitHub Actions)
├── playwright.config.ts                # baseURL, projetos, reporter
├── tsconfig.json
├── package.json
├── requirements.md                     # estado real da automação
├── README.md
└── src/
    ├── config/site.ts                  # mapeamento de campos de formulário
    ├── fixtures/pagesFixture.ts        # fixtures dos Page Objects
    ├── logging/                        # logs de execução (não versionados)
    ├── pages/                          # Page Objects
    │   ├── BasePage.ts                 # navegação, log e self-healing
    │   ├── HomePage.ts
    │   ├── QuemSomosPage.ts
    │   ├── SuportePage.ts
    │   ├── EnglishHomePage.ts
    │   └── AboutUsPage.ts
    ├── testdata/                       # massas de teste (JSON)
    ├── tests/e2e/                      # cenários de teste
    └── utils/
        ├── LoggerUtil.ts               # logger (winston)
        └── SelfHealingUtil.ts          # localizadores com fallback
```

## Cenários

| Arquivo | Cenário |
|---|---|
| `home.spec.ts` | Home PT: carregamento, busca/CTA e navegação para o suporte |
| `cenario-01-nossas-solucoes.spec.ts` | Submenu "Nossas soluções" (itens presentes e descontinuados) |
| `cenario-02-quem-somos.spec.ts` | Quem Somos: busca, linha do tempo, selo GPTW e cidades |
| `cenario-03-alteracao-idioma.spec.ts` | Alteração de idioma PT → EN |
| `cenario-04-fale-com-especialista.spec.ts` | Suporte: opções de atendimento e campos obrigatórios |

## Configuração (`playwright.config.ts`)

- **Projetos**: Chromium, Firefox, WebKit e Mobile Safari (iPhone 12).
- **Paralelismo**: `fullyParallel: true`.
- **Reporter**: HTML (`playwright-report/`).
- **Evidências**: screenshot e vídeo sempre; trace na primeira repetição.

## Navegadores e observações

- A suíte tem **68 execuções** (17 testes × 4 projetos). Situação atual:
  **56 passam, 12 são pulados, 0 falham**.
- No **Mobile Safari**, 12 testes são pulados porque o layout mobile oculta os elementos
  testados (lupa, CTA de especialista, selo GPTW, cidades e o mega-menu, que abre por
  *hover* no desktop). O pulo é explícito via `test.skip(isMobile, ...)`.

## Relatórios

O reporter HTML gera `playwright-report/`. Abra com:

```bash
npx playwright show-report
```

> Dica: executar com `--reporter=line` **substitui** o reporter HTML e não regenera o
> relatório. Use `npm test` para atualizá-lo.
