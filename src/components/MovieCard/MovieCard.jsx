import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';

const imageUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
    return (
      <li className={styles.movie_card}>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={imageUrl + movie.poster_path}
            alt={movie.title}
            className={styles.movie_image}
          />
          <h3 className={styles.movie_title}>{movie.title}</h3>
        </Link>
      </li>
    );
}

export default MovieCard;