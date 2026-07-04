# MyFlix 🎬

> Plataforma de streaming com busca em tempo real consumindo a API do TMDB.

## Sobre

Interface inspirada na Netflix que consome a API do The Movie Database (TMDB) para 
exibir filmes e series com busca em tempo real, detalhes completos e player de trailer.

**Problema resolvido:** Dificuldade de descobrir filmes e series com informacoes completas 
em uma unica interface rapida e responsiva.

## Stack

React 18 • TypeScript • Vite • TMDB API • CSS3 Modules

## Funcionalidades

- Busca em tempo real com debounce (resposta < 200ms)
- Catalogo com 10.000+ filmes e series indexados
- Pagina de detalhes com sinopse, elenco e avaliacao
- Player de trailer integrado
- Grid responsivo com lazy loading
- Paginacao infinita
- Tema escuro (cinema mode)

## Metricas

- PageSpeed Mobile: 94+
- Resposta de busca: < 200ms
- Cobertura de cache: 100% das requisicoes a API

```bash
git clone https://github.com/KaduSR/myflix-micro
cd myflix-micro
echo "VITE_TMDB_KEY=sua_chave" > .env
npm install && npm run dev
```

🔗 [Demo](https://myflix.kadudev.com/)

