import styles from './MovieCard.module.css';

const imageUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
    return (

        <li className={styles.movie_card}>
            <img
                src={imageUrl + movie.poster_path}
                alt={movie.title}
                className={styles.movie_image}
            />
            <h3 className={styles.movie_title}>{movie.title}</h3>
        </li>
    );
}

export default MovieCard;