import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import { FaStar, FaRegClock, FaPlay, FaUser, FaTv } from "react-icons/fa";
import styles from "./Series.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

const apiKey = import.meta.env.VITE_API_KEY;
const seriesURL = "https://api.themoviedb.org/3/tv/";
const imageUrl = "https://image.tmdb.org/t/p/original/";

function Series() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [creators, setCreators] = useState([]);

  async function getSerie(url) {
    const response = await fetch(url);
    const data = await response.json();
    setSerie(data);
    setCreators(data.created_by || []);
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

  async function getCast(id) {
    const creditsUrl = `${seriesURL}${id}/credits?api_key=${apiKey}&language=pt-BR`;
    try {
      const response = await fetch(creditsUrl);
      const data = await response.json();
      setCast(data.cast.slice(0, 10));
    } catch (error) {
      console.error("Erro ao buscar elenco:", error);
    }
  }

  async function getRecommendations(id) {
    const recommendationsUrl = `${seriesURL}${id}/recommendations?api_key=${apiKey}&language=pt-BR`;
    try {
      const response = await fetch(recommendationsUrl);
      const data = await response.json();
      setRecommendations(data.results.slice(0, 10));
    } catch (error) {
      console.error("Erro ao buscar recomendações:", error);
    }
  }

  useEffect(() => {
    const serieUrl = `${seriesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getSerie(serieUrl);
    getVideos(id);
    getCast(id);
    getRecommendations(id);
    window.scrollTo(0, 0);
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
                  alt={serie.name}
                />
                <div className={styles.serie_details}>
                  <h1>{serie.name}</h1>
                  {serie.tagline && (
                    <p className={styles.tagline}>"{serie.tagline}"</p>
                  )}
                  
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
                      <FaTv /> {serie.number_of_seasons} Temporada(s)
                    </span>
                    <span>
                      <FaStar /> {serie.vote_average?.toFixed(1)}
                    </span>
                    {serie.first_air_date && (
                      <span className={styles.year_badge}>
                        {serie.first_air_date.split("-")[0]}
                      </span>
                    )}
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

                  <div className={styles.info_grid}>
                    {creators.length > 0 && (
                      <div className={styles.info}>
                        <h3>
                          <FaUser /> Criador(es):
                        </h3>
                        <p>{creators.map(c => c.name).join(", ")}</p>
                      </div>
                    )}

                    <div className={styles.info}>
                      <h3>
                        <FaTv /> Total de Episódios:
                      </h3>
                      <p>{serie.number_of_episodes || "N/A"} episódios</p>
                    </div>

                    {serie.status && (
                      <div className={styles.info}>
                        <h3>Status:</h3>
                        <p>{serie.status}</p>
                      </div>
                    )}
                  </div>

                  <div className={styles.info}>
                    <h3>Sinopse:</h3>
                    <p className={styles.overview}>
                      {serie.overview || "Sinopse não disponível."}
                    </p>
                  </div>

                  {/* Informações das Temporadas */}
                  {serie.seasons && serie.seasons.length > 0 && (
                    <div className={styles.seasons_info}>
                      <h3>
                        <FaTv /> Temporadas:
                      </h3>
                      <div className={styles.seasons_grid}>
                        {serie.seasons
                          .filter(season => season.season_number > 0)
                          .map((season) => (
                            <div key={season.id} className={styles.season_card}>
                              <span className={styles.season_number}>
                                Temporada {season.season_number}
                              </span>
                              <span className={styles.season_episodes}>
                                {season.episode_count} episódios
                              </span>
                              {season.air_date && (
                                <span className={styles.season_year}>
                                  {season.air_date.split("-")[0]}
                                </span>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
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
                        <p className={styles.cast_character}>{actor.character}</p>
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
                  <span className={styles.title_icon}>💡</span> Você Também Pode Gostar
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
            <p>Carregando detalhes da série...</p>
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

export default Series;