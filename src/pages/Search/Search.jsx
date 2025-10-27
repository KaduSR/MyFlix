import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Search.module.css";
import { FaFilm, FaTv, FaFilter } from "react-icons/fa";

const searchURL = "https://api.themoviedb.org/3/search/multi";
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filter, setFilter] = useState("all"); // all, movie, tv
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("q");

  async function getSearchedContent(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      // Filtra apenas filmes e séries
      const filtered = data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
      setResults(filtered);
      setFilteredResults(filtered);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?api_key=${apiKey}&query=${query}&language=pt-BR`;
    getSearchedContent(searchWithQueryURL);
    setFilter("all");
  }, [query]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredResults(results);
    } else if (filter === "movie") {
      setFilteredResults(results.filter((item) => item.media_type === "movie"));
    } else if (filter === "tv") {
      setFilteredResults(results.filter((item) => item.media_type === "tv"));
    }
  }, [filter, results]);

  const movieCount = results.filter(
    (item) => item.media_type === "movie"
  ).length;
  const tvCount = results.filter((item) => item.media_type === "tv").length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Resultados para: <span className={styles.query_text}>{query}</span>
        </h2>
        <p className={styles.results_count}>
          {filteredResults.length} resultado(s) encontrado(s)
        </p>
      </div>

      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.filter_label}>
          <FaFilter /> Filtrar por:
        </div>
        <button
          className={`${styles.filter_button} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => setFilter("all")}
        >
          Todos ({results.length})
        </button>
        <button
          className={`${styles.filter_button} ${
            filter === "movie" ? styles.active : ""
          }`}
          onClick={() => setFilter("movie")}
        >
          <FaFilm /> Filmes ({movieCount})
        </button>
        <button
          className={`${styles.filter_button} ${
            filter === "tv" ? styles.active : ""
          }`}
          onClick={() => setFilter("tv")}
        >
          <FaTv /> Séries ({tvCount})
        </button>
      </div>

      {/* Resultados */}
      <div className={styles.movies_container}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Buscando...</p>
          </div>
        )}

        {!loading && filteredResults.length === 0 && (
          <div className={styles.no_results}>
            <div className={styles.no_results_icon}>🔍</div>
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente usar palavras-chave diferentes ou mais gerais</p>
          </div>
        )}

        {!loading &&
          filteredResults.length > 0 &&
          filteredResults.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
      </div>
    </div>
  );
}

export default Search;
