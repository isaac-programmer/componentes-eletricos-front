# Front-end - Projeto: Componentes Elétricos

## Descrição

O projeto consiste num gerenciador de componentes eletrônicos utilizados nos laboratórios da Universidade Federal do Ceará - Campus de Sobral. 

Com ele será possível:
- Administrar componentes, usuários, laboratórios e dentre outros.
- Emitir relatórios de consumo e movimentação de componentes.
- Controlar o estoque de componentes elétricos.

## 1. Requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/pt) (v22 ou superior)
- [Docker](https://www.docker.com/) (Opcional, para executar via contêiner)

## 2. Setup Inicial do Projeto

Clone o repositório e instale as dependências do projeto:

```bash
$ npm install
```

## 3. Configuração do Ambiente

A aplicação precisa de um arquivo de variáveis de ambiente para saber qual API será utilizada e determianr os nomes dos cookies a serem utilizados. Nós fornecemos um arquivo de exemplo para facilitar a configuração.

### Passo 2.1: Crie o arquivo .env

Copie o arquivo de exemplo **.env.example** para criar seu arquivo **.env** local.

No Linux ou macOS:

```bash
$ cp .env.example .env
```

No Windows (Command Prompt):

```bash
$ copy .env.example .env
```

### Passo 2.2: Configure a URL da API
Abra o arquivo **.env** recém-criado. Ele deve conter as seguintes variáveis:

```bash
NODE_ENV=coloque_aqui_o_ambiente_utilizado
NEXT_PUBLIC_API_URL=coloque_aqui_a_url_da_api
NEXT_PUBLIC_TOKEN_KEY=coloque_o_nome_do_cookie_do_token_a_ser_utilizado_no_navegador
NEXT_PUBLIC_REFRESH_TOKEN_KEY=coloque_o_nome_do_cookie_do_refresh_token_a_ser_utilizado_no_navegador
```

**Importante:** Ao rodar localmente **(npm run dev)**, essas variáveis são lidas do arquivo **.env**. Ao construir uma imagem Docker, elas precisam ser passadas durante o build, **veja a Seção 5**.

## 4. Executando Localmente

Com as dependências instaladas e o ambiente configurado, você já pode iniciar a aplicação.

### Modo de Desenvolvimento

Execute o comando abaixo para iniciar o servidor de desenvolvimento. Ele irá recarregar automaticamente a página sempre que você fizer uma alteração no código.

```bash
$ npm run dev
```

A aplicação estará disponível em http://localhost:3000 ou na porta definida por você

### Modo de Produção Local

Para simular o ambiente de produção na sua máquina (sem Docker), você precisa primeiro **"buildar"** o projeto e depois iniciá-lo.

```bash
# 1. Compila e otimiza o projeto para produção
$ npm run build

# 2. Inicia o servidor de produção
$ npm run start
```

## 5. Executando com Docker

O **Dockerfile** fornecido é otimizado para produção usando multi-stage build.

### 5.1 A Importância das Variáveis de Build (ARG)

Diferente do modo de desenvolvimento, as variáveis **NEXT_PUBLIC_** são injetadas no código no momento do build. Por isso, não adianta passá-las ao executar o contêiner, elas devem ser passadas durante a construção da imagem usando **--build-arg**

### 5.2 Construindo (Build) a Imagem

Use o comando docker build para criar a imagem, passando os ARGs. Você deve apontar NEXT_PUBLIC_API_URL para o endereço da sua API em produção (ex: Vercel, Heroku, etc.).

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL="https://inventario-componentes-api.vercel.app" \
  --build-arg NEXT_PUBLIC_TOKEN_KEY="inventario.token" \
  --build-arg NEXT_PUBLIC_REFRESH_TOKEN_KEY="inventario.refresh" \
  -t seu_usuario_docker/nome_da_imagem:1.0.0 .
```

Em seguida execute a imagem no docker gerando um container e passe todas as variáveis env na criação do container

A aplicação estará disponível em http://localhost:3000 ou na porta definida por você.