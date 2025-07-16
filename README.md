
# Stockinho

Este projeto é um teste técnico de backend que simula uma parte da arquitetura do sistema de estoque da Quero Educação. O objetivo é consumir mensagens do Kafka contendo ofertas, realizar validações e persistir ou reportar os resultados.

## Objetivo

Criar um microserviço capaz de:

- Consumir mensagens do tópico Kafka `command.offers.create` com uma lista de ofertas
- Validar e salvar as ofertas válidas no banco de dados
- Publicar mensagens com o status da operação nos tópicos apropriados:
  - `event.offers.created`
  - `event.offers.create.failed`

## Funcionalidades

### Validações

- Duplicatas na lista por `university_offer_id` e `discount_percentage`
- `discountPercentage` e `offeredPrice` são opcionais, mas **um deles deve estar presente**
- Se ambos estiverem presentes, validar consistência com `fullPrice`
- Se apenas `offeredPrice` estiver presente, calcular `discountPercentage`
- Datas:
  - `start` não pode ser menor que a data atual
  - `end` não pode ser menor que a data atual
  - `start` deve ser menor ou igual ao `end`

### Processamento

- Inserir as ofertas válidas no banco de dados
- Publicar as válidas no tópico `event.offers.created`
- Publicar as inválidas no tópico `event.offers.create.failed` com os erros
- Logar chave composta por: tópico, partição e offset da mensagem

## Tecnologias Utilizadas

- Node.js com TypeScript
- NestJS
- Apache Kafka
- Banco relacional (ex: PostgreSQL)
- Docker
- Jest (testes unitários)

## Testes

- Cobertura de testes unitários para os principais fluxos e validações

## Estrutura da Mensagem (Kafka)

### Tópico: `command.offers.create`

```json
{
  "operationId": "number",
  "items": [
    {
      "name": "string",
      "level": "string",
      "shift": "string",
      "kind": "string",
      "universityOffers": [
        {
          "enrollmentSemester": "string",
          "fullPrice": "number",
          "maxPayments": "number"
        }
      ],
      "offers": [
        {
          "discountPercentage": "number",
          "offeredPrice": "number",
          "start": "date",
          "end": "date"
        }
      ]
    }
  ]
}
```
# Arquitetura
<img width="1487" height="822" alt="image (8)" src="https://github.com/user-attachments/assets/8d53744a-979c-41d0-9d28-25e37c4062bf" />
