import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Search.module.css";

const searchURL = "https://api.themoviedb.org/3/search/movie";
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  async function getSearchedMovies(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }

  useEffect(() => {
    // Monta a URL de busca completa com a chave da API e o termo pesquisado
    const searchWithQueryURL = `${searchURL}?api_key=${apiKey}&query=${query}&language=pt-BR`;

    // Chama a função para buscar os dados
    getSearchedMovies(searchWithQueryURL);
  }, [query]); // O useEffect será executado novamente sempre que a 'query' mudar

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Resultados para: <span className={styles.query_text}>{query}</span>
      </h2>
      <div className={styles.movies_container}>
        {movies.length === 0 && <p>Nenhum resultado encontrado...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default Search;
