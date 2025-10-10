import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Home.module.css";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = "https://api.themoviedb.org/3/movie/popular";

function Home() {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    try {
      const response = await fetch(
        `${apiUrl}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) throw new Error("Falha na resposta da API");
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filmes Populares</h2>

      <div className={styles.movies_container}>
        {movies.length === 0 && <p>Carregando filmes...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      <h2 className={styles.title}>Séries Populares</h2>
      {/* Futuramente, podemos adicionar outras seções aqui, como "Séries Populares" */}
    </div>
  );
}

export default Home;
