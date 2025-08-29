# Front-end - Projeto: Componentes Elétricos

## Descrição

Esta é a interface de usuário (front-end) para o gerenciador de componentes eletrônicos utilizados nos laboratórios da Universidade Federal do Ceará - Campus de Sobral. A partir desta aplicação, será possível emitir relatórios de consumo, administrar os componentes, os usuários do sistema, dentre outras funcionalidades, consumindo os dados da API do projeto.

## 1. Setup Inicial do Projeto

Garanta que você possua o **Node.js** (versão 18 ou superior) instalado em sua máquina.

Em seguida, instale as dependências do projeto:

```bash
$ npm install
```

## 2. Configuração do Ambiente (.env)

A aplicação precisa de um arquivo de variáveis de ambiente para saber onde a API está sendo executada. Nós fornecemos um arquivo de exemplo para facilitar a configuração.

### Passo 2.1: Crie o arquivo .env

Copie o arquivo de exemplo .env.example para criar seu arquivo .env local.

No Linux ou macOS:

```bash
$ cp .env.example .env
```

No Windows (Command Prompt):

```bash
$ copy .env.example .env
```

### Passo 2.2: Configure a URL da API
Abra o arquivo .env recém-criado. Ele deve conter a seguinte variável:

NEXT_PUBLIC_API_URL=http://localhost:3333

Esta variável aponta para o endereço onde a sua API está rodando. Se você alterou a porta da API, ajuste o valor aqui.

**Importante:** O prefixo NEXT_PUBLIC_ é uma convenção de segurança do Next.js para expor a variável de ambiente de forma segura ao navegador. Variáveis sem este prefixo só são acessíveis no lado do servidor.

## 5. Rode o Projeto

Com as dependências instaladas e o ambiente configurado, você já pode iniciar a aplicação.

### Modo de Desenvolvimento

Execute o comando abaixo para iniciar o servidor de desenvolvimento. Ele irá recarregar automaticamente a página sempre que você fizer uma alteração no código.

```bash
$ npm run dev
```

A aplicação estará disponível em http://localhost:3000.

### Modo de Produção

Para simular o ambiente de produção, você precisa primeiro "buildar" o projeto e depois iniciá-lo.

```bash
# 1. Compila e otimiza o projeto para produção
$ npm run build

# 2. Inicia o servidor de produção
$ npm run start
```