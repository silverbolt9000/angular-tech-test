# Angular Technical Test

Aplicação desenvolvida como solução para o teste técnico de Front-End Angular.

## Tecnologias utilizadas

* Angular 21+
* Angular Material
* RxJS
* Signals
* NgRx
* TypeScript
* SCSS
* Vite
* Vitest/Jest

---

# Funcionalidades implementadas

## Listagem de usuários

* Cards de usuários
* Busca com debounce
* Loading state
* Error state
* Criação de usuário
* Edição de usuário
* Formulário reativo
* Validações de formulário
* Modal utilizando Angular Material

---

# Exemplos técnicos implementados

## RxJS

* DebounceTime
* SwitchMap
* Cancelamento de requisições
* Async Pipe
* Gerenciamento de subscriptions

## Signals

* Estado local com Signals
* Computed signals
* Output utilizando effect

## NgRx

* Actions
* Reducers
* Selectors
* Effects
* Fluxo assíncrono mockado

## Performance

* ChangeDetectionStrategy.OnPush
* trackBy
* Renderização otimizada de listas

## TypeScript

* Refatoração com boas práticas
* Generics
* Tipagem forte
* Reutilização de código

---

# Estrutura do projeto

```txt
src/app
├── core
├── shared
├── features
│   └── users
├── examples
│   ├── rxjs-search
│   ├── signals-cart
│   ├── ngrx-todo
│   ├── performance
│   ├── refactor
│   └── generics
└── layout
```

---

# Instalação

## Clonar o projeto

```bash
git clone <url-do-repositorio>
```

---

## Instalar dependências

```bash
npm install
```

---

## Executar o projeto

```bash
npm start
```

ou

```bash
ng serve
```

A aplicação ficará disponível em:

```txt
http://localhost:4200
```

---

# Executar testes

```bash
npm run test
```

---

# Decisões técnicas

* Utilização de Standalone Components
* Estado local com Signals
* Gerenciamento global com NgRx
* Async Pipe para evitar memory leaks
* Componentização focada em reutilização
* Estratégia OnPush para otimização de performance
* Organização modular baseada em features

---

# Observações

Os dados utilizados na aplicação são mockados localmente para simplificar a execução do projeto sem necessidade de backend.

Todos os exemplos técnicos solicitados no teste foram implementados e disponibilizados através do menu lateral da aplicação.
