import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { FaStar, FaWallet, FaRegClock, FaPlay, FaTimes } from "react-icons/fa"; // Ícones para os detalhes
import styles from "./Movie.module.css";

import TrailerModal from "../../components/TrailerModal/TrailerModal";

const apiKey = import.meta.env.VITE_API_KEY;
const moviesURL = "https://api.themoviedb.org/3/movie/";
const imageUrl = "https://image.tmdb.org/t/p/original/"; // Usaremos a imagem original para o fundo

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getMovie(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  }

  async function getVideos(id) {
    const videosUrl = `${moviesURL}${id}/videos?api_key=${apiKey}&language=pt-BR`;
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
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
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
      <div className={styles.movie_page}>
        {movie ? ( // Verifica se os dados do filme já chegaram
          <>
            {/* A div principal terá a imagem de fundo */}
            <div
              className={styles.movie_backdrop}
              style={{
                backgroundImage: `url(${imageUrl}${movie.backdrop_path})`,
              }}
            >
              <div className={styles.movie_overlay}></div> {/* Camada escura */}
              <div className={styles.movie_content}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className={styles.movie_details}>
                  <h1>{movie.title}</h1>
                  <p className={styles.tagline}>{movie.tagline}</p>
                  <div className={styles.info_bar}>
                    <div className={styles.rating}>
                      <CircularProgressbar
                        value={movie.vote_average * 10}
                        text={`${(movie.vote_average * 10).toFixed(0)}%`}
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
                      <FaRegClock /> {movie.runtime} min
                    </span>
                  </div>
                  <div className={styles.genres}>
                    {movie.genres &&
                      movie.genres.map((genre) => (
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
                      {movie.budget > 0
                        ? formatCurrency(movie.budget)
                        : "Não informado"}
                    </p>
                  </div>

                  {/* Bloco separado para a Receita */}
                  <div className={styles.info}>
                    <h3>
                      <FaWallet /> Receita:
                    </h3>
                    <p>
                      {movie.revenue > 0
                        ? formatCurrency(movie.revenue)
                        : "Não informado"}
                    </p>
                  </div>
                  <div className={styles.info}>
                    <h3>Sinopse:</h3>
                    <p className={styles.overview}>
                      {movie.overview
                        ? movie.overview
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
      <TrailerModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        trailerKey={trailerKey}
      />
    </>
  );
}

export default Movie;
