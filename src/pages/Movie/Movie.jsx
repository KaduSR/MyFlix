import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Movie.module.css';

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = 'https://api.themoviedb.org/3/movie/';
const imageUrl = 'https://image.tmdb.org/t/p/w500/'; // URL base para imagens


function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    async function getMovie() {
    // Função para buscar os detalhes do filme na API
    const response = await fetch(`${apiUrl}${id}?api_key=${apiKey}&language=pt_BR`);
    const data = await response.json();
    setMovie(data);
}

useEffect(() => {
    getMovie();
}, [id]); // Reexecuta a busca se o ID do filme mudar

//Formata o orçamento para o formato de moeda BRL
function formatCurrency(number) {
    return number.toLocaleString('pt_BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
}

return (
    <div className={styles.movie_page}>
        {movie ? (
            <>
                <img className={styles.poster} src={imageUrl + movie.poster_path} alt={movie.title} />
                <div className={styles.movie_details}>
                    <h1>{movie.title}</h1>
                    <p className={styles.tagline}>{movie.tagline}</p>
                    <div className={styles.info}>
                        <h3>Orçamento:</h3>
                        <p>{movie.budget > 0 ? formatCurrency(movie.budget) : "Não informado"}</p>
                    </div>
                    <div className={styles.info}>
                        <h3>Receita:</h3>
                        <p>{movie.revenue > 0 ? formatCurrency(movie.revenue) : "Não informado"}</p>
                    </div>
                    <div className={styles.info}>
                        <h3>Sinopse:</h3>
                        <p className={styles.overview}>{movie.overview}</p>

                    </div>

                    </div>
            </>
    ) : (
        <p>Carregando detalhes do filme...</p>
    )}
    </div>
);
}

export default Movie;