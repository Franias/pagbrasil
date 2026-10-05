# Framework de Automação de Testes Enterprise para a AUT (PagBrasil)

## 1. Visão Geral

O framework de automação de testes enterprise foi projetado para oferecer uma solução robusta, escalável e rica em recursos para os testes automatizados da aplicação sob teste (AUT) — o site da PagBrasil, reproduzido localmente por fixtures. O framework abrange diversos recursos, incluindo testes orientados a dados, logging, mecanismo de retry, self-healing, testes cross-browser, múltiplos ambientes, criptografia de senha, qualidade de código, integração CI/CD, utilitários reutilizáveis, geração de dados, testes em paralelo e mocking/teste de API.

## 2. Funcionalidades

### 2.1 Implementação do Page Object Model (POM)

- **Objetivo:** Aplicar o princípio POM para estruturar o código e torná-lo reutilizável e de fácil manutenção.

### 2.2 Testes Orientados a Dados (Data-Driven Testing)

- **Objetivo:** Ampliar a cobertura de testes parametrizando os cenários com dados externos (ex.: PT/EN, conjuntos de massa).

### 2.3 Logging

- **Objetivo:** Fornecer logs abrangentes para uma análise detalhada da execução dos testes.

### 2.4 Mecanismo de Retry

- **Objetivo:** Tratar falhas intermitentes de forma elegante, com tentativas automáticas.

### 2.5 Self-Healing

- **Objetivo:** Adaptar-se a mudanças dinâmicas na aplicação (AUT) para minimizar esforço de manutenção.

### 2.6 Testes Cross-Browser

- **Objetivo:** Validar o funcionamento da aplicação em diferentes navegadores.

### 2.7 Múltiplos Ambientes

- **Objetivo:** Suportar testes em ambientes variados (ex.: fixtures locais, homologação, produção).

### 2.8 Criptografia de Senha

- **Objetivo:** Gerenciar e utilizar credenciais com segurança nos cenários de teste.

### 2.9 Qualidade de Código

- **Objetivo:** Impor padrões de codificação e manter código de alta qualidade.

### 2.10 Integração CI/CD

- **Objetivo:** Integrar o framework de forma transparente aos pipelines de CI/CD.

### 2.11 Utilitários Reutilizáveis

- **Objetivo:** Desenvolver utilitários modulares e reutilizáveis para otimizar a manutenção do código.

### 2.12 Geração de Dados

- **Objetivo:** Gerar dados de teste dinamicamente para garantir cenários diversificados.

### 2.13 Testes em Paralelo

- **Objetivo:** Executar testes de forma concorrente para obter feedback mais rápido e otimizar a suíte.

### 2.14 Mocking/Teste de API

- **Objetivo:** Mockar e testar as APIs da aplicação para validar o comportamento de backend.

## 3. Cenários de Teste (Amostra)

### 3.1 Classe Page Object e teste básico

**Cenário:** Verificar a criação da classe Page para a página inicial e criar um teste básico.

**Passos:**
1. Criar a classe POM para a página inicial (home).
2. Criar testes usando a classe Page e seus métodos para acessar a home.
   - Acessar a página inicial.
   - Verificar o sucesso do carregamento e os elementos principais.

### 3.2 Testes Orientados a Dados

**Cenário:** Verificar a navegação com diferentes conjuntos de dados.

**Passos:**
1. Recuperar os dados de teste de uma fonte externa.
2. Para cada conjunto de dados:
   - Acessar a página correspondente.
   - Validar o conteúdo conforme o idioma/variação informada.
   - Verificar que o resultado é o esperado.

### 3.3 Logging

**Cenário:** Validar o logging detalhado durante uma transação complexa.

**Passos:**
1. Iniciar uma transação complexa na aplicação.
2. Executar uma série de passos.
3. Registrar resultados intermediários, status e eventuais erros em cada passo.
4. Verificar o arquivo de log quanto às entradas e mensagens de erro esperadas.

### 3.4 Mecanismo de Retry

**Cenário:** Testar o retry automático de uma navegação que falhou.

**Passos:**
1. Introduzir uma falha temporária na abertura da página ou no login.
2. Configurar o framework para repetir a operação.
3. Verificar que a operação é bem-sucedida após o número de tentativas configurado.

### 3.5 Self-Healing

**Cenário:** Validar o self-healing para uma estrutura de página alterada.

**Passos:**
1. Identificar um elemento estável em uma página da aplicação.
2. Introduzir uma mudança na estrutura do elemento identificado.
3. Executar um cenário que dependa do elemento alterado.
4. Verificar que o framework se ajusta dinamicamente e o cenário passa.

### 3.6 Testes Cross-Browser

**Cenário:** Verificar a aplicação em diferentes navegadores.

**Passos:**
1. Configurar o teste para rodar em Chromium, Firefox e WebKit.
2. Acessar as páginas e realizar as principais transações em cada navegador.
3. Verificar comportamento consistente entre os navegadores.

### 3.7 Múltiplos Ambientes

**Cenário:** Testar a funcionalidade em diferentes ambientes.

**Passos:**
1. Configurar o teste para rodar contra fixtures locais, homologação e produção.
2. Executar os cenários em cada ambiente.
3. Verificar que a aplicação se comporta conforme o esperado em cada ambiente.

### 3.8 Criptografia de Senha

**Cenário:** Utilizar credenciais criptografadas com segurança.

**Passos:**
1. Criptografar uma senha de login (ou dado sensível) com o mecanismo de criptografia do framework.
2. Autenticar-se utilizando a senha criptografada.
3. Verificar o login bem-sucedido com a senha criptografada.

### 3.9 Qualidade de Código

**Cenário:** Impor padrões de codificação nos scripts de automação.

**Passos:**
1. Realizar revisão de código quanto à aderência aos padrões definidos.
2. Identificar e corrigir eventuais problemas de qualidade.
3. Utilizar ferramentas de análise estática para assegurar a qualidade.

### 3.10 Integração CI/CD

**Cenário:** Integrar a automação ao pipeline de CI/CD.

**Passos:**
1. Configurar o pipeline de CI/CD para disparar a automação de testes.
2. Monitorar a execução do pipeline e validar a integração bem-sucedida.

### 3.11 Utilitários Reutilizáveis

**Cenário:** Validar o reuso de funções utilitárias nos testes.

**Passos:**
1. Identificar uma funcionalidade comum a vários testes.
2. Implementar uma função utilitária reutilizável.
3. Utilizar a função utilitária em múltiplos cenários de teste.

### 3.12 Geração de Dados

**Cenário:** Gerar dados de teste dinâmicos.

**Passos:**
1. Criar um cenário que exija dados de teste dinâmicos.
2. Implementar um utilitário de geração de dados.
3. Executar o cenário com os dados gerados dinamicamente.
4. Verificar o tratamento correto dos dados dinâmicos.

### 3.13 Testes em Paralelo

**Cenário:** Executar os testes de forma concorrente para otimizar a execução.

**Passos:**
1. Identificar uma suíte de cenários adequada à execução paralela.
2. Configurar o framework para execução paralela.
3. Executar a suíte identificada de forma concorrente.

### 3.14 Mocking/Teste de API

**Cenário:** Mockar e testar as interações de API.

**Passos:**
1. Identificar uma API utilizada em um cenário de teste.
2. Implementar um mock para a API identificada.
3. Executar o cenário, validando a interação com a API mockada.

## Nota:

- Adapte estes cenários para corresponder à aplicação (AUT) específica e às particularidades do framework.
- Atualize a documentação regularmente para refletir mudanças e adições de funcionalidades e cenários.
