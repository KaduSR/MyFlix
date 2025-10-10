import styles from './SeriesCard.module.css';
import { Link } from 'react-router-dom';

const imageUrl = "https://image.tmdb.org/t/p/w500";

function SeriesCard({ series }) {
    return (
      <li className={styles.series_card}>
        <Link to={`/series/${series.id}`}>
          <img
            src={imageUrl + series.poster_path}
            alt={series.title}
            className={styles.series_image}
          />
          <h3 className={styles.series_title}>{series.title}</h3>
        </Link>
      </li>
    );
}

export default SeriesCard;