<p align="center">
  <img align="center" src="docs/banner.png">
</p>

# ZapList - Atualize sua playlist diretamente pelo WhatssApp
<p align="center">
  <img align="center" src="docs/demo-video.gif">
</p>
O ZapList é um bot para o WhatsApp que adiciona músicas a uma playlist pré-definida do Spotify. O bot é desenvolvido com o objetivo de receber mensagens de texto com o nome da música enviadas pelo usuário no WhatsApp e, a partir daí, realizar uma busca pela música utilizando a API do Spotify. Caso a música seja encontrada, o bot a adiciona à playlist definida no Spotify.

## Tecnologias utilizadas
- [Twilio API](https://www.twilio.com/) para integrar com o WhatsApp;
- [spotify-eb-api-node](https://github.com/thelinmichael/spotify-web-api-node) para acessar a API do Spotify;
- [Express](https://expressjs.com/pt-br/);
- [Vitest](https://vitest.dev/);
- [tsx](https://github.com/esbuild-kit/tsx) para executar a aplicação em ambiente de desenvolvimento;
- [tsup](https://github.com/egoist/tsup) para gerar build de produção;
- TypeScript;
- Clean Architecture para organizar o código;

## Instalação
- Clone este repositório
- Execute `yarn` para instalar as dependências
- Crie uma conta no Twilio e adquira um número de telefone com acesso ao WhatsApp
- Crie uma conta no Spotify Developer Dashboard e registre uma aplicação para obter as credenciais da API
- Copie o arquivo `.env.example` e renomeie-o para `.env`
- Adicione suas credenciais do [**Twilio**](https://www.twilio.com/) e do [**Spotify**](https://developer.spotify.com/) no arquivo .env
- Execute npm start para iniciar a aplicação


### Comandos

- **`buscar <nome-da-faixa>`**: realiza uma busca no Spotify pela faixa correspondente ao nome fornecido. Se a faixa for encontrada, retorna informações sobre ela, incluindo seu ID, que pode ser usado para adicioná-la à playlist.

- **`adicionar <id-da-faixa>`** ou **`adc <id-da-faixa>`**: adiciona a faixa correspondente ao ID fornecido à playlist pré-definida do Spotify.

- **`historico**`** ou **`listar`**: retorna um histórico das últimas músicas adicionadas à playlist pelo bot.

## Uso
Envie uma mensagem de texto para o número de WhatsApp do bot com o nome da música que deseja adicionar à playlist. Se a música for encontrada, o bot a adicionará à playlist pré-definida do Spotify.


Por exemplo, para buscar a faixa "Sleep on the Floor" da banda The Lumineers, o usuário pode enviar a mensagem **"buscar Sleep on the Floor"** para o número do WhatsApp do bot. O bot responderá com uma mensagem contendo informações sobre a faixa, incluindo seu ID. Se o usuário desejar adicionar essa faixa à playlist, ele pode enviar a mensagem  `adicionar <id-da-faixa>`, substituindo `<id-da-faixa>` pelo ID retornado pelo bot. O bot então adicionará a faixa à playlist. Para visualizar o histórico de músicas adicionadas, o usuário pode enviar a mensagem "`historico` ou `listar`".

## Contribuição
- Faça um fork deste repositório
- Crie um branch com suas mudanças (git checkout -b minha-branch)
- Realize as mudanças e faça commit delas (git commit -am 'Minha mudança')
- Realize um push do branch (git push origin minha-branch)
- Abra um pull request
