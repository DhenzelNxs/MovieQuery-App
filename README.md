<p align="center">
  <img src="src/assets/MovieQuery-App_logo.png" alt="MovieQuery App" width="140" />
</p>

<h1 align="center">MovieQuery App</h1>

<p align="center">
  Aplicativo mobile de filmes e séries, construído com Expo e integrado à API do TMDB.
</p>

## Sobre o projeto

O MovieQuery é um app React Native (Expo) para descobrir filmes e séries. Ele consome a API
pública do TMDB (The Movie Database) para exibir lançamentos, listas de destaque, detalhes
completos com trailer, elenco e avaliações, além de permitir favoritar títulos para acessar depois.

O login é feito com a própria conta do TMDB, usando o fluxo oficial de autenticação da API
(request token → aprovação no site do TMDB → criação de sessão), sem backend próprio.

## Funcionalidades

- **Login com TMDB** — autenticação via fluxo oficial da API do TMDB, com retorno ao app por
  deep link (`moviequery-app://callback`).
- **Carrossel de lançamentos** com reprodução de trailer (YouTube) direto no card.
- **Listagens em destaque**: top 10 filmes da semana, top 10 séries da semana e filmes populares.
- **Busca** por filmes, séries e pessoas, com debounce e resultados em tempo real.
- **Detalhes de filme/série**: sinopse, nota, elenco (scroll automático), trailer, temporadas (no
  caso de séries) e avaliações de outros usuários do TMDB.
- **Favoritos**: marcar/desmarcar filmes e séries, com lista dedicada e persistência local.
- **Pull to refresh** e skeletons de carregamento nas listagens da home.

## Tecnologias

- [Expo](https://expo.dev/) 53 / [React Native](https://reactnative.dev/) 0.79 / React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) e [React Navigation](https://reactnavigation.org/) (bottom tabs + native stack)
- [TanStack Query](https://tanstack.com/query/latest) para cache e requisições
- [Zustand](https://zustand-demo.pmnd.rs/) para estado global (usuário e favoritos)
- [Axios](https://axios-http.com/) para consumo da API do TMDB
- [styled-components](https://styled-components.com/) para estilização
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) e [reanimated-carousel](https://github.com/dohooo/react-native-reanimated-carousel) para animações e carrosséis
- [Shopify FlashList](https://shopify.github.io/flash-list/) para listas performáticas
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para persistência local
- TypeScript

## Pré-requisitos

- [Node.js](https://nodejs.org/) e Yarn ou npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`, sem instalação global necessária)
- Uma chave de API do TMDB — crie uma conta gratuita em
  [themoviedb.org](https://www.themoviedb.org/settings/api) e gere sua chave em
  **Configurações > API**.

## Instalação

```sh
git clone https://github.com/DhenzelNxs/MovieQuery-App.git
cd MovieQuery-App
yarn install
# ou: npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e preencha sua chave do TMDB:

```sh
cp .env.example .env
```

```env
TMDB_API_KEY=sua_chave_aqui
```

A chave é lida em tempo de build pelo `react-native-dotenv` (arquivo `babel.config.js`)
e usada em todas as requisições feitas em `Services/tmdbApi.ts`.

## Executando o projeto

```sh
yarn start      # abre o Expo Dev Tools / QR code
yarn android    # roda em um emulador ou dispositivo Android
yarn ios        # roda em um simulador ou dispositivo iOS
yarn web        # roda a versão web (experimental, via react-native-web)
```

Para rodar no celular, basta escanear o QR code gerado pelo `yarn start` com o app
**Expo Go** (Android/iOS).

## Estrutura do projeto

```text
App/            # Telas (Home, Login, Movie, Favorites) e seus estilos
Components/     # Componentes reutilizáveis (Header, Skeleton, ícones animados etc.)
Routes/         # Navegação (stack de autenticação, tabs e stack principal)
Services/       # Cliente HTTP da API do TMDB
hooks/          # Hooks de dados (TanStack Query) para home, login e detalhes de filme/série
Storage/        # Stores do Zustand (usuário autenticado e favoritos)
Utils/          # Helpers de formatação, conversão e debounce
Enums/          # Constantes (ex.: base URL de imagens do TMDB)
Public/         # Imagens e SVGs estáticos usados no app
```
