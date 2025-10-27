# 🎬 MyFlix - Plataforma de Descoberta de Filmes e Séries

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Modules" />
</div>

## 📋 Sobre o Projeto

MyFlix é uma aplicação web moderna e responsiva para descoberta de filmes e séries, inspirada no design da Netflix. O projeto utiliza a API do TMDB (The Movie Database) para fornecer informações atualizadas sobre milhares de títulos.

### ✨ Principais Funcionalidades

- 🎯 **Hero Banner Dinâmico** - Destaque rotativo com os conteúdos mais populares
- 🔥 **Seções Categorizadas** - Em Alta, Populares, Top Avaliados, Em Breve
- 🔍 **Busca Avançada** - Sistema de busca com filtros por tipo (filme/série)
- 📺 **Páginas Detalhadas** - Informações completas sobre filmes e séries
- 🎭 **Elenco e Equipe** - Visualização dos atores e criadores
- 💡 **Recomendações** - Sugestões personalizadas baseadas no conteúdo
- 🎬 **Trailers Integrados** - Player de vídeos do YouTube
- 📱 **Design Responsivo** - Otimizado para todos os dispositivos
- ⚡ **Animações Suaves** - Experiência de usuário fluida e moderna

## 🎨 Design e UX

O projeto foi desenvolvido com foco em:

- **Identidade Visual**: Paleta de cores inspirada na Netflix (#E50914)
- **Tipografia**: Fonte Poppins para legibilidade e modernidade
- **Micro-interações**: Animações e transições suaves
- **Glassmorphism**: Efeitos de blur e transparência
- **Gradientes**: Uso estratégico para depth e hierarquia visual
- **Dark Mode**: Interface escura para conforto visual

## 🚀 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server ultrarrápido
- **React Router DOM** - Roteamento declarativo

### Bibliotecas
- **react-circular-progressbar** - Indicadores de avaliação
- **react-modal** - Modais acessíveis
- **react-youtube** - Player de trailers
- **react-icons** - Ícones vetoriais

### Estilização
- **CSS Modules** - Estilos com escopo local
- **CSS Custom Properties** - Variáveis CSS para tematização
- **Flexbox & Grid** - Layouts modernos e responsivos

### API
- **TMDB API** - Base de dados de filmes e séries

## 📂 Estrutura do Projeto

```
myflix/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   ├── MovieCard/
│   │   │   ├── MovieCard.jsx
│   │   │   └── MovieCard.module.css
│   │   └── TrailerModal/
│   │       ├── TrailerModal.jsx
│   │       └── TrailerModal.module.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Movie/
│   │   │   ├── Movie.jsx
│   │   │   └── Movie.module.css
│   │   ├── Series/
│   │   │   ├── Series.jsx
│   │   │   └── Series.module.css
│   │   └── Search/
│   │       ├── Search.jsx
│   │       └── Search.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 16.x ou superior
- NPM ou Yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/myflix.git
cd myflix
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_KEY=sua_chave_da_api_tmdb
```

> 📝 **Como obter a chave da API:**
> 1. Acesse [TMDB](https://www.themoviedb.org/)
> 2. Crie uma conta gratuita
> 3. Vá em Configurações > API
> 4. Solicite uma chave de API

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**

Abra o navegador em `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🎯 Funcionalidades Detalhadas

### 🏠 Página Inicial
- Hero banner com conteúdo em destaque
- 5 seções com carrosséis horizontais
- Loading states com spinners
- Navegação fluida entre seções

### 🎬 Página de Filme
- Backdrop de alta resolução
- Informações detalhadas (duração, orçamento, receita)
- Avaliação com progress bar circular
- Botão para assistir trailer
- Seção de elenco principal
- Recomendações relacionadas

### 📺 Página de Série
- Todas as features da página de filme
- Informações de temporadas e episódios
- Grid de temporadas com detalhes
- Status de produção

### 🔍 Página de Busca
- Busca multi-categoria (filmes e séries)
- Filtros interativos
- Contador de resultados
- Estado vazio estilizado
- Loading state

### 🎨 Componentes

#### MovieCard
- Hover com informações extras
- Badge de tipo (filme/série)
- Rating visível
- Thumbnail de alta qualidade
- Animações suaves

#### Header
- Busca com expansão ao focar
- Logo animado
- Sticky positioning
- Efeito blur no scroll

#### Footer
- Links de navegação
- Redes sociais
- Créditos da API
- Copyright dinâmico

## 🎨 Paleta de Cores

```css
--netflix-red: #E50914
--background-dark: #141414
--background-medium: #222222
--text-white: #FFFFFF
--text-gray: #b3b3b3
--border-gray: #4d4d4d
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints em:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## ⚡ Performance

- **Code Splitting** com React Router
- **Lazy Loading** de imagens
- **CSS Modules** para estilos isolados
- **Vite** para builds otimizados
- **Debounce** em buscas

## 🔮 Melhorias Futuras

- [ ] Sistema de favoritos com localStorage
- [ ] Modo claro/escuro
- [ ] Integração com autenticação
- [ ] Listas personalizadas
- [ ] Compartilhamento social
- [ ] PWA com offline support
- [ ] Internacionalização (i18n)
- [ ] Testes unitários e E2E

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para os amantes de cinema

---

<div align="center">
  <p>⭐ Deixe uma estrela se você gostou do projeto!</p>
  <p>🐛 Encontrou um bug? Abra uma issue</p>
  <p>💡 Tem uma sugestão? Contribua com o projeto</p>
</div>
```

## 🙏 Agradecimentos

- [TMDB](https://www.themoviedb.org/) pela API gratuita
- [React Icons](https://react-icons.github.io/react-icons/) pelos ícones
- Comunidade React pela inspiração

---

**Powered by TMDB API**
