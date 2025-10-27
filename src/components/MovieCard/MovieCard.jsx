import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import { FaStar, FaCalendar } from "react-icons/fa";

const imageUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const linkType = movie.title ? "movie" : "tv";

  // Formatar data
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? releaseDate.split("-")[0] : "N/A";

  // Rating
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <li className={styles.movie_card}>
      <Link to={`/${linkType}/${movie.id}`}>
        <div className={styles.card_image_wrapper}>
          <img
            src={imageUrl + movie.poster_path}
            alt={movie.title || movie.name}
            className={styles.movie_image}
          />

          {/* Badge de tipo */}
          <span className={styles.type_badge}>
            {linkType === "movie" ? "🎬" : "📺"}
          </span>

          {/* Rating overlay */}
          <div className={styles.rating_overlay}>
            <FaStar className={styles.star_icon} />
            <span>{rating}</span>
          </div>

          {/* Hover overlay com informações extras */}
          <div className={styles.hover_overlay}>
            <div className={styles.hover_content}>
              <h3 className={styles.hover_title}>
                {movie.title || movie.name}
              </h3>
              <div className={styles.hover_info}>
                <span className={styles.hover_year}>
                  <FaCalendar /> {year}
                </span>
                <span className={styles.hover_rating}>
                  <FaStar /> {rating}
                </span>
              </div>
              <p className={styles.hover_description}>
                {movie.overview
                  ? movie.overview.substring(0, 100) + "..."
                  : "Sem descrição disponível"}
              </p>
              <button className={styles.hover_button}>Ver Detalhes</button>
            </div>
          </div>
        </div>

        <h3 className={styles.movie_title}>{movie.title || movie.name}</h3>
      </Link>
    </li>
  );
}

export default MovieCard;
