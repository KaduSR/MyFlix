import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Home.module.css";
import { FaPlay ,FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;
const moviesApiUrl = "https://api.themoviedb.org/3/movie/popular";
const seriesApiUrl = "https://api.themoviedb.org/3/tv/popular";
const trendingUrl = "https://api.themoviedb.org/3/trending/all/day";
const topRatedMoviesUrl = "https://api.themoviedb.org/3/movie/top_rated";
const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming";
const imageUrl = "https://image.tmdb.org/t/p/original";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [heroBanner, setHeroBanner] = useState(null);
  const navigate = useNavigate();

  async function getPopularMovies() {
    const response = await fetch(
      `${moviesApiUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setPopularMovies(data.results || []); // FIX: Default to empty array
  }

  async function getPopularSeries() {
    const response = await fetch(
      `${seriesApiUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setPopularSeries(data.results || []); // FIX: Default to empty array
  }

  async function getTrending() {
    const response = await fetch(
      `${trendingUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setTrending(data.results || []); // FIX: Default to empty array
    // Define o primeiro item como hero banner (com segurança)
    if (data.results && data.results.length > 0) {
      setHeroBanner(data.results[0]);
    }
  }

  async function getTopRated() {
    const response = await fetch(
      `${topRatedMoviesUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setTopRated(data.results || []); // FIX: Default to empty array
  }

  async function getUpcoming() {
    const response = await fetch(
      `${upcomingMoviesUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setUpcoming(data.results || []); // FIX: Default to empty array
  }

  useEffect(() => {
    getTrending();
    getPopularMovies();
    getPopularSeries();
    getTopRated();
    getUpcoming();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleBannerClick = () => {
    if (heroBanner) {
      const type = heroBanner.title ? "movie" : "tv";
      navigate(`/${type}/${heroBanner.id}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Banner */}
      {heroBanner && (
        <div
          className={styles.hero_banner}
          style={{
            backgroundImage: `url(${imageUrl}${heroBanner.backdrop_path})`,
          }}
        >
          <div className={styles.hero_overlay}></div>
          <div className={styles.hero_content}>
            <h1 className={styles.hero_title}>
              {heroBanner.title || heroBanner.name}
            </h1>
            <div className={styles.hero_info}>
              <span className={styles.hero_rating}>
                ⭐ {heroBanner.vote_average?.toFixed(1)}
              </span>
              <span className={styles.hero_year}>
                {heroBanner.release_date?.split("-")[0] ||
                  heroBanner.first_air_date?.split("-")[0]}
              </span>
              <span className={styles.hero_badge}>
                {heroBanner.title ? "FILME" : "SÉRIE"}
              </span>
            </div>
            <p className={styles.hero_description}>
              {truncateText(heroBanner.overview, 200)}
            </p>
            <div className={styles.hero_buttons}>
              <button
                className={styles.hero_button_play}
                onClick={handleBannerClick}
              >
                <FaPlay /> Assistir Agora
              </button>
              <button
                className={styles.hero_button_info}
                onClick={handleBannerClick}
              >
                <FaInfoCircle /> Mais Informações
              </button>
            </div>
          </div>
          <div className={styles.hero_fade}></div>
        </div>
      )}

      {/* Em Alta Hoje */}
      <section className={styles.section}>
        <h2 className={styles.title}>
          <span className={styles.title_icon}>🔥</span> Em Alta Hoje
        </h2>
        <div className={styles.movies_container}>
          {/* A verificação (trending.length) agora é segura */}
          {trending.length === 0 && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Carregando...</p>
            </div>
          )}
          {trending.length > 0 &&
            trending.map((item) => <MovieCard key={item.id} movie={item} />)}
        </div>
      </section>

      {/* Filmes Populares */}
      <section className={styles.section}>
        <h2 className={styles.title}>
          <span className={styles.title_icon}>🎬</span> Filmes Populares
        </h2>
        <div className={styles.movies_container}>
          {popularMovies.length === 0 && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Carregando...</p>
            </div>
          )}
          {popularMovies.length > 0 &&
            popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </section>

      {/* Top Avaliados */}
      <section className={styles.section}>
        <h2 className={styles.title}>
          <span className={styles.title_icon}>⭐</span> Top Avaliados
        </h2>
        <div className={styles.movies_container}>
          {topRated.length === 0 && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Carregando...</p>
            </div>
          )}
          {topRated.length > 0 &&
            topRated.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Séries Populares */}
      <section className={styles.section}>
        <h2 className={styles.title}>
          <span className={styles.title_icon}>📺</span> Séries Populares
        </h2>
        <div className={styles.movies_container}>
          {popularSeries.length === 0 && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Carregando...</p>
            </div>
          )}
          {popularSeries.length > 0 &&
            popularSeries.map((serie) => (
              <MovieCard key={serie.id} movie={serie} />
            ))}
        </div>
      </section>

      {/* Em Breve */}
      <section className={styles.section}>
        <h2 className={styles.title}>
          <span className={styles.title_icon}>🎭</span> Em Breve nos Cinemas
        </h2>
        <div className={styles.movies_container}>
          {/* Esta lógica já estava correta e segura! */}
          {!Array.isArray(upcoming) ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Carregando...</p>
            </div>
          ) : upcoming.length === 0 ? (
            <p>Nenhum filme encontrado.</p>
          ) : (
            upcoming.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </section>

      {/* Seções duplicadas removidas */}
    </div>
  );
}

export default Home;
