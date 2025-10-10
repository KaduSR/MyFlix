import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Importe os ícones e estilos que vamos usar
import { FaStar, FaRegClock } from "react-icons/fa";
import styles from "./Series.module.css";

const apiKey = import.meta.env.VITE_API_KEY;
// A URL base agora aponta para "/tv/"
const seriesURL = "https://api.themoviedb.org/3/tv/";
const imageUrl = "https://image.tmdb.org/t/p/original/";

function Series() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);

  async function getSerie(url) {
    const response = await fetch(url);
    const data = await response.json();
    setSerie(data);
  }

  useEffect(() => {
    const serieUrl = `${seriesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getSerie(serieUrl);
  }, [id]);

  return (
    <>
      {serie && (
        <div
          className={styles.serie_page}
          style={{ backgroundImage: `url(${imageUrl}${serie.backdrop_path})` }}
        >
          <div className={styles.serie_overlay}></div>
          <div className={styles.serie_content}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
              alt={serie.name}
            />
            <div className={styles.serie_details}>
              {/* Séries usam 'name' em vez de 'title' */}
              <h1>{serie.name}</h1>
              <p className={styles.tagline}>{serie.tagline}</p>
              <div className={styles.info_bar}>
                <span>
                  <FaStar color="#f5c518" /> {serie.vote_average.toFixed(1)}
                </span>
                {/* Séries têm número de temporadas */}
                <span>
                  <FaRegClock /> {serie.number_of_seasons} Temporada(s)
                </span>
              </div>
              <div className={styles.info}>
                <h3>Sinopse:</h3>
                <p className={styles.overview}>{serie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Series;
