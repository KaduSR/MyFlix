import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Home.module.css";

const apiKey = import.meta.env.VITE_API_KEY;
const moviesApiUrl = "https://api.themoviedb.org/3/movie/popular";
const seriesApiUrl = "https://api.themoviedb.org/3/tv/popular";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  async function getPopularMovies() {
    const response = await fetch(
      `${moviesApiUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setPopularMovies(data.results);
  }

  async function getPopularSeries() {
    const response = await fetch(
      `${seriesApiUrl}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();
    setPopularSeries(data.results);
  }

  useEffect(() => {
    getPopularMovies();
    getPopularSeries();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filmes Populares</h2>
      <div className={styles.movies_container}>
        {popularMovies.length === 0 && <p>Carregando...</p>}
        {popularMovies.length > 0 &&
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>

      <h2 className={styles.title}>Séries Populares</h2>
      <div className={styles.movies_container}>
        {popularSeries.length === 0 && <p>Carregando...</p>}
        {popularSeries.length > 0 &&
          popularSeries.map((serie) => (
            <MovieCard key={serie.id} movie={serie} />
          ))}
      </div>
    </div>
  );
}

export default Home;
