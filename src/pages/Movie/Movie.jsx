import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { FaStar, FaWallet, FaRegClock, FaPlay, FaUser } from "react-icons/fa";
import styles from "./Movie.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

const apiKey = import.meta.env.VITE_API_KEY;
const moviesURL = "https://api.themoviedb.org/3/movie/";
const imageUrl = "https://image.tmdb.org/t/p/original/";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [director, setDirector] = useState(null);

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

  async function getCast(id) {
    const creditsUrl = `${moviesURL}${id}/credits?api_key=${apiKey}&language=pt-BR`;
    try {
      const response = await fetch(creditsUrl);
      const data = await response.json();
      setCast(data.cast.slice(0, 10)); // Pega os 10 primeiros atores

      // Encontra o diretor
      const movieDirector = data.crew.find(
        (person) => person.job === "Director"
      );
      setDirector(movieDirector);
    } catch (error) {
      console.error("Erro ao buscar elenco:", error);
    }
  }

  async function getRecommendations(id) {
    const recommendationsUrl = `${moviesURL}${id}/recommendations?api_key=${apiKey}&language=pt-BR`;
    try {
      const response = await fetch(recommendationsUrl);
      const data = await response.json();
      setRecommendations(data.results.slice(0, 10));
    } catch (error) {
      console.error("Erro ao buscar recomendações:", error);
    }
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
    getVideos(id);
    getCast(id);
    getRecommendations(id);

    // Scroll para o topo quando mudar de filme
    window.scrollTo(0, 0);
  }, [id]);

  const formatCurrency = (number) => {
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <>
      <div className={styles.movie_page}>
        {movie ? (
          <>
            <div
              className={styles.movie_backdrop}
              style={{
                backgroundImage: `url(${imageUrl}${movie.backdrop_path})`,
              }}
            >
              <div className={styles.movie_overlay}></div>
              <div className={styles.movie_content}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className={styles.movie_details}>
                  <h1>{movie.title}</h1>
                  {movie.tagline && (
                    <p className={styles.tagline}>"{movie.tagline}"</p>
                  )}

                  <div className={styles.info_bar}>
                    <div className={styles.rating}>
                      <CircularProgressbar
                        value={movie.vote_average * 10}
                        text={`${(movie.vote_average * 10).toFixed(0)}%`}
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
                      <FaRegClock /> {formatRuntime(movie.runtime)}
                    </span>
                    <span>
                      <FaStar /> {movie.vote_average?.toFixed(1)}
                    </span>
                    {movie.release_date && (
                      <span className={styles.year_badge}>
                        {movie.release_date.split("-")[0]}
                      </span>
                    )}
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

                  <div className={styles.info_grid}>
                    {director && (
                      <div className={styles.info}>
                        <h3>
                          <FaUser /> Diretor:
                        </h3>
                        <p>{director.name}</p>
                      </div>
                    )}

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
                  </div>

                  <div className={styles.info}>
                    <h3>Sinopse:</h3>
                    <p className={styles.overview}>
                      {movie.overview
                        ? movie.overview
                        : "Sinopse não disponível em português."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Elenco */}
            {cast.length > 0 && (
              <section className={styles.cast_section}>
                <h2 className={styles.section_title}>
                  <span className={styles.title_icon}>🎭</span> Elenco Principal
                </h2>
                <div className={styles.cast_container}>
                  {cast.map((actor) => (
                    <div key={actor.id} className={styles.cast_card}>
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className={styles.cast_image}
                        />
                      ) : (
                        <div className={styles.cast_placeholder}>
                          <FaUser size={40} />
                        </div>
                      )}
                      <div className={styles.cast_info}>
                        <p className={styles.cast_name}>{actor.name}</p>
                        <p className={styles.cast_character}>
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Seção de Recomendações */}
            {recommendations.length > 0 && (
              <section className={styles.recommendations_section}>
                <h2 className={styles.section_title}>
                  <span className={styles.title_icon}>💡</span> Você Também Pode
                  Gostar
                </h2>
                <div className={styles.recommendations_container}>
                  {recommendations.map((rec) => (
                    <MovieCard key={rec.id} movie={rec} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className={styles.loading_container}>
            <div className={styles.spinner}></div>
            <p>Carregando detalhes do filme...</p>
          </div>
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
