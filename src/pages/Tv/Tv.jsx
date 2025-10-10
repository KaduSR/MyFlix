import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { FaStar, FaWallet, FaRegClock, FaPlay, FaTimes } from "react-icons/fa"; // Ícones para os detalhes
import styles from "./Tv.module.css";
import Modal from "react-modal";
import YouTube from "react-youtube";

const apiKey = import.meta.env.VITE_API_KEY;
const tvsURL = "https://api.themoviedb.org/3/tv/";
const imageUrl = "https://image.tmdb.org/t/p/original/"; // Usaremos a imagem original para o fundo

function Tv() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getTv(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTv(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da série:", error);
    }
  }

  async function getVideos(id) {
    const videosUrl = `${tvsURL}${id}/videos?api_key=${apiKey}&language=pt-BR`;
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
    const tvUrl = `${tvsURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getTv(tvUrl);
    getVideos(id); // Busca o vídeo do trailer
  }, [id]);

  // Função para formatar números como moeda (Real)
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <div className={styles.tv_page}>
        {tv ? ( // Verifica se os dados da série já chegaram
          <>
            {/* A div principal terá a imagem de fundo */}
            <div
              className={styles.tv_backdrop}
              style={{
                backgroundImage: `url(${imageUrl}${tv.backdrop_path})`,
              }}
            >
              <div className={styles.tv_overlay}></div> {/* Camada escura */}
              <div className={styles.tv_content}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                  alt={tv.title}
                />
                <div className={styles.tv_details}>
                  <h1>{tv.title}</h1>
                  <p className={styles.tagline}>{tv.tagline}</p>
                  <div className={styles.info_bar}>
                    <div className={styles.rating}>
                      <CircularProgressbar
                        value={tv.vote_average * 10}
                        text={`${(tv.vote_average * 10).toFixed(0)}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: "#081c22", // Cor de fundo do círculo
                          textColor: "#fff",
                          pathColor: "#21d07a", // Cor da barra de progresso (verde TMDB)
                          trailColor: "transparent",
                        })}
                      />
                    </div>
                    <span>
                      <FaRegClock /> {tv.runtime} min
                    </span>
                  </div>
                  <div className={styles.genres}>
                    {tv.genres &&
                      tv.genres.map((genre) => (
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
                  {/* Bloco separado para o Orçamento */}
                  <div className={styles.info}>
                    <h3>
                      <FaWallet /> Orçamento:
                    </h3>
                    <p>
                      {tv.budget > 0
                        ? formatCurrency(tv.budget)
                        : "Não informado"}
                    </p>
                  </div>

                  {/* Bloco separado para a Receita */}
                  <div className={styles.info}>
                    <h3>
                      <FaWallet /> Receita:
                    </h3>
                    <p>
                      {tv.revenue > 0
                        ? formatCurrency(tv.revenue)
                        : "Não informado"}
                    </p>
                  </div>
                  <div className={styles.info}>
                    <h3>Sinopse:</h3>
                    <p className={styles.overview}>
                      {tv.overview
                        ? tv.overview
                        : "Sinopse não disponivel em português."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando detalhes do filme...</p>
        )}
      </div>
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

export default Tv;
