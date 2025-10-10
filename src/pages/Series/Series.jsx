import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { FaStar, FaRegClock, FaPlay, FaTimes } from "react-icons/fa";
import styles from "./Series.module.css"; // Lembre-se de usar o CSS de Serie
import TrailerModal from "../../components/TrailerModal/TrailerModal";

const apiKey = import.meta.env.VITE_API_KEY;
const seriesURL = "https://api.themoviedb.org/3/tv/"; // URL alterada
const imageUrl = "https://image.tmdb.org/t/p/original/";

function Series() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null); // Variável alterada
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getSerie(url) {
    // Função alterada
    const response = await fetch(url);
    const data = await response.json();
    setSerie(data); // Variável alterada
  }

  async function getVideos(id) {
    const videosUrl = `${seriesURL}${id}/videos?api_key=${apiKey}&language=pt-BR`; // URL alterada
    const response = await fetch(videosUrl);
    const data = await response.json();
    const officialTrailer = data.results.find(
      (video) => video.official === true && video.type === "Trailer"
    );
    if (officialTrailer) {
      setTrailerKey(officialTrailer.key);
    } else if (data.results.length > 0) {
      setTrailerKey(data.results[0].key);
    }
  }

  useEffect(() => {
    const serieUrl = `${seriesURL}${id}?api_key=${apiKey}&language=pt-BR`; // URL alterada
    getSerie(serieUrl); // Função alterada
    getVideos(id);
  }, [id]);

  return (
    <>
      <div className={styles.serie_page}>
        {serie ? (
          <>
            <div
              className={styles.serie_backdrop}
              style={{
                backgroundImage: `url(${imageUrl}${serie.backdrop_path})`,
              }}
            >
              <div className={styles.serie_overlay}></div>
              <div className={styles.serie_content}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                  alt={serie.name} // Propriedade alterada
                />
                <div className={styles.serie_details}>
                  <h1>{serie.name}</h1> {/* Propriedade alterada */}
                  <p className={styles.tagline}>{serie.tagline}</p>
                  <div className={styles.info_bar}>
                    <div className={styles.rating}>
                      <CircularProgressbar
                        value={serie.vote_average ? serie.vote_average * 10 : 0}
                        text={`${
                          serie.vote_average
                            ? (serie.vote_average * 10).toFixed(0)
                            : "N/A"
                        }%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: "#081c22",
                          textColor: "#fff",
                          pathColor: "#21d07a",
                          trailColor: "transparent",
                        })}
                      />
                    </div>
                    <span>
                      <FaRegClock /> {serie.number_of_seasons} Temporada(s)
                    </span>{" "}
                    {/* Informação alterada */}
                  </div>
                  <div className={styles.genres}>
                    {Array.isArray(serie.genres) &&
                      serie.genres.map((genre) => (
                        <span key={genre.id} className={styles.genre}>
                          {genre.name}
                        </span>
                      ))}
                  </div>
                  {trailerKey && (
                    <button
                      className={styles.trailer_button}
                      onClick={() => setModalIsOpen(true)}
                    >
                      <FaPlay /> Assistir Trailer
                    </button>
                  )}
                  <div className={styles.info}>
                    <h3>Sinopse:</h3>
                    <p className={styles.overview}>
                      {serie.overview || "Sinopse não disponível."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando detalhes da série...</p>
        )}
      </div>
      <TrailerModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        trailerKey={trailerKey}
      />
    </>
  );
}

export default Series;
