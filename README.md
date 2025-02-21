# 🔍 API de Busca com Doc as Code

[![Bun](https://img.shields.io/badge/Bun-1.0.0-black)](https://bun.sh)
[![Elysia](https://img.shields.io/badge/Elysia-Latest-blue)](https://elysiajs.com)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-green)](https://swagger.io)

> Uma API de busca demonstrando o conceito de Documentation as Code usando Swagger/OpenAPI

## 📋 Sobre o Projeto

Este projeto implementa uma API de busca com documentação integrada ao código, demonstrando boas práticas de desenvolvimento e documentação. Utilizei o Swagger (OpenAPI) como ferramenta de documentação, permitindo que a documentação evolua junto com o código.

### Requisitos Implementados

#### Requisito Funcional (RF)
- **RF001**: Busca de sites via API REST
  - Endpoint GET /search
  - Aceita parâmetros de busca
  - Retorna resultados estruturados

#### Requisito Não-Funcional (RNF)
- **RNF001**: Monitoramento de Performance
  - Métricas em tempo real
  - Taxa de sucesso
  - Tempo médio de resposta

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
bun install
```
3. Execute o servidor:
```bash
bun run src/index.ts
```
4. Acesse a documentação:
```
http://localhost:3000/swagger
```

## 📚 Documentation as Code

Essa abordagem utiliza Swagger/OpenAPI em vez de Gherkin porque:
- Gera documentação interativa
- Permite testes diretos via interface web
- Mantém documentação sempre atualizada
- Integra-se naturalmente com o código

## 🛠 Endpoints

### GET /search
- Realiza buscas em sites
- Parâmetros:
  - `q`: termo de busca (string)
- Retorna: lista de resultados com título, URL e descrição

### GET /metrics
- Fornece métricas de performance
- Retorna estatísticas de uso e sucesso

## ⚡ Tecnologias

- [Bun](https://bun.sh) - Runtime JavaScript/TypeScript
- [Elysia](https://elysiajs.com) - Framework Web
- [@elysiajs/swagger](https://elysiajs.com/plugins/swagger.html) - Plugin de Documentação

## 📊 Métricas de Performance

- Tempo médio de resposta: < 500ms
- Taxa de sucesso alvo: > 99%
- Monitoramento em tempo real
