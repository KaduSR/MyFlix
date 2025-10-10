import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';

const imageUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const linkType = movie.title ? 'movie' : 'tv'; // Determina se é filme ou série
    return (
      <li className={styles.movie_card}>
        <Link to={`/${linkType}/${movie.id}`}>
          <img
            src={imageUrl + movie.poster_path}
            alt={movie.title}
            className={styles.movie_image}
          />
          <h3 className={styles.movie_title}>{movie.title || movie.name}</h3>
        </Link>
      </li>
    );
}

export default MovieCard;