import { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { FaStar, FaWallet, FaRegClock, FaPlay, FaTimes } from "react-icons/fa"; // Ícones para os detalhes
import Modal from "react-modal";
import YouTube from "react-youtube";
import styles from "./Series.module.css";


const apiKey = import.meta.env.VITE_API_KEY;
// A URL base agora aponta para "/tv/"
const seriesURL = "https://api.themoviedb.org/3/tv/";
const imageUrl = "https://image.tmdb.org/t/p/original/";

function Series() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getSerie(url) {
    const response = await fetch(url);
    const data = await response.json();
    setSerie(data);
  }
  async function getVideos(id) {
    const videosUrl = `${seriesURL}${id}/videos?api_key=${apiKey}&language=pt-BR`;
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
    const serieUrl = `${seriesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getSerie(serieUrl);
    getVideos(id); // Busca o vídeo do trailer
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
                  <FaStar color="#f5c518" />{" "}
                  {serie.vote_average ? serie.vote_average.toFixed(1) : "N/A"}
                </span>
                {/* Séries têm número de temporadas */}
                <span>
                  <FaRegClock /> {serie.number_of_seasons} Temporada(s)
                </span>
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
                <p className={styles.overview}>{serie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button
          className={styles.close_modal_button}
          onClick={() => setModalIsOpen(false)}
        >
          <FaTimes size={20} />
        </button>
        {trailerKey && (
          <YouTube videoId={trailerKey} className={styles.youtube_player} />
        )}
      </Modal>
      </>
  );
}

export default Series;
