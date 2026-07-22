# Interface - Inventário de Componentes Eletrônicos

O projeto consiste na interface do sistema de inventário de componentes eletrônicos, utilizados nos laboratórios dos cursos de engenharia da Universidade Federal do Ceará - Campus de Sobral. 

Com ele será possível:
- Gerenciar componentes, usuários, laboratórios e o estoque de componentes eletrônicos por laboratório.
- Emitir relatórios de consumo de componentes num determinado período.

## 1. Requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/pt) (v22 ou superior)
- [Docker](https://www.docker.com/) (Opcional - Para execução via contêiner)

## 2. Setup Inicial do Projeto

Clone o repositório no Github e instale as dependências do projeto:

```bash
$ npm install
```

## 3. Configuração do Ambiente de Execução

A aplicação precisa de um arquivo **.env** para ser executada. No projeto encontra-se o arquivo **.env.example** a partir do qual você poderá criar o arquivo **.env** com as variáveis de ambiente necessárias para a execução do projeto.

### Passo 3.1: Criando o arquivo .env

No Linux ou macOS, digite no terminal:

```bash
$ cp .env.example .env
```

No Windows, digite no terminal:

```bash
$ copy .env.example .env
```

### Passo 3.2: Definição dos valores das variáveis de ambiente
Abra o arquivo **.env** recém-criado. Ele deve conter as seguintes variáveis e seus respectivos valores:

```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL="Informe a URL da API"
NEXT_PUBLIC_TOKEN_KEY="exemplo_nome_do_cookie.token"
NEXT_PUBLIC_REFRESH_TOKEN_KEY="exemplo_nome_do_cookie.refresh_token"
NEXT_PUBLIC_USER_PASSWORD_DEFAULT="Informe a senha padrão para os usuários que serão cadastrados"
```

## 4. Executando Localmente

Com as dependências instaladas e o ambiente configurado, você já pode executar a aplicação.

### 4.1 Modo de Desenvolvimento

Execute o comando abaixo para iniciar o servidor de desenvolvimento:

```bash
$ npm run dev
```

A aplicação estará disponível em http://localhost:3000 ou na porta definida por você.

### 4.2 Modo de Produção

Para simular o ambiente de produção na sua máquina, você deve primeiro gerar o build do projeto e depois executar os seguintes comandos:

```bash
$ npm run build

$ npm run start
```

A aplicação estará disponível em http://localhost:3000 ou na porta definida por você.

## 5. Executando com Docker

### 5.1 A Importância das Variáveis de Build

Diferente do modo de desenvolvimento, as variáveis **NEXT_PUBLIC_** são injetadas no código no momento do build. Por isso, não adianta passá-las ao executar o contêiner, elas devem ser passadas durante a construção da imagem usando **--build-arg**

### 5.2 Construindo a Imagem

Use o comando abaixo para criar a imagem, passando os **ARGs** necessários. Em **NEXT_PUBLIC_API_URL** você deve inserir o endereço da API em produção na plataforma que você escolheu (Ex.: Vercel, Render e dentre outras).

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL="Informe a URL da API" \
  --build-arg NEXT_PUBLIC_TOKEN_KEY="exemplo_nome_do_cookie.token" \
  --build-arg NEXT_PUBLIC_REFRESH_TOKEN_KEY="exemplo_nome_do_cookie.refresh_token" \
  --build-arg NEXT_PUBLIC_USER_PASSWORD_DEFAULT="Informe a senha padrão para os usuários que serão cadastrados" \
  -t seu_usuario_docker/nome_da_imagem:1.0.0 .
```

### 5.3 Executando a Imagem

Com a imagem construída, você pode iniciar o contêiner. Como as variáveis `NEXT_PUBLIC_` já foram injetadas no momento do *build* (conforme explicado na seção 5.1), não é necessário repassá-las agora. Basta mapear a porta desejada (Ex.: `3000`).

Execute o seguinte comando:

```bash
docker run -d -p 3000:3000 --name nome_do_seu_container nome_do_seu_usuario/nome_da_imagem:1.0.0
```

- `-d`: Executa o contêiner em segundo plano.
- `-p 3000:3000`: Mapeia a porta `3000` da sua máquina para a porta `3000` do contêiner.

Após a execução, a aplicação estará disponível em http://localhost:3000 (ou na porta externa que você definiu).