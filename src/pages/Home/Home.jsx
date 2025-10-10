
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

// Pegamos a chave da API do arquivo .env

const apiKey = import.meta.env.VITE_API_KEY;

const apiURL = "https://api.themoviedb.org/3/movie/popular";

function Home() {
    const [movies, setMovies] = useState([]);

    async function getMovies() {
          // Usamos o 'Fetch API' para fazer a requisição
    const response = await fetch(`${apiURL}?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();

    // Guardamos a lista de filmes(data.results) no estado 'movies'
    setMovies(data.results);
    }
    useEffect(() => {
        // Chama a função para buscar os filmes quando o componente é montado
        getMovies();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Filmes Populares</h2>
            <ul className={styles.movies_container}>
                {/* Verificamos se a lista de filmes está vazia */}
                {movies.length === 0 && <p>Carregando filmes...</p>}
                {movies.length > 0 && 
                movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </ul>
        </div>
    );
}


export default Home;
