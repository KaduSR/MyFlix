import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaRegClock,
  FaPlay,
  FaUser,
  FaTv,
  FaChevronDown, // Readicionado
  FaChevronUp, // Readicionado
} from "react-icons/fa";
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
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  // NOVO ESTADO: Controla qual episódio está com a sinopse expandida
  const [expandedEpisode, setExpandedEpisode] = useState(null);

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

  async function getSeasonEpisodes(seasonNumber) {
    if (selectedSeason === seasonNumber) {
      setSelectedSeason(null);
      setEpisodes([]);
      setExpandedEpisode(null); // Fecha sinopse aberta ao fechar temporada
      return;
    }

    setEpisodesLoading(true);
    setEpisodes([]);
    setSelectedSeason(seasonNumber);
    setExpandedEpisode(null); // Fecha sinopse aberta ao abrir nova temporada

    const episodesUrl = `${seriesURL}${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`;

    try {
      const response = await fetch(episodesUrl);
      const data = await response.json();
      setEpisodes(data.episodes || []);
    } catch (error) {
      console.error("Erro ao buscar episodios:", error);
      setEpisodes([]);
    } finally {
      setEpisodesLoading(false);
    }
  }

  // NOVA FUNÇÃO: Manipula o clique no botão de expandir sinopse
  const handleToggleEpisode = (episodeId) => {
    if (expandedEpisode === episodeId) {
      setExpandedEpisode(null); // Fecha se já estiver aberto
    } else {
      setExpandedEpisode(episodeId); // Abre o clicado
    }
  };

  useEffect(() => {
    const serieUrl = `${seriesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getSerie(serieUrl);
    getVideos(id);
    getCast(id);
    getRecommendations(id);
    setSelectedSeason(null);
    setEpisodes([]);
    setExpandedEpisode(null); // Reseta episódio expandido ao trocar de série
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
                  {/* ... (tagline, info_bar, genres, trailer_button, info_grid, sinopse da série) ... */}

                  <div className={styles.info}>
                    <h3>Sinopse:</h3>
                    <p className={styles.overview}>
                      {serie.overview || "Sinopse não disponível."}
                    </p>
                  </div>

                  {/* Informações das Temporadas */}
                  {serie.seasons && serie.seasons.length > 0 && (
                    <div className={styles.seasons_info}>
                      {creators.length > 0 && (
                        <div className={styles.info}>
                          <h3>
                            <FaUser /> Criador(es):
                          </h3>
                          <p>{creators.map((c) => c.name).join(", ")}</p>
                        </div>
                      )}
                      <h3>
                        <FaTv /> Temporadas:
                      </h3>
                      <div className={styles.seasons_grid}>
                        {serie.seasons
                          .filter((season) => season.season_number > 0)
                          .map((season) => (
                            <button
                              key={season.id}
                              className={`${styles.season_card} ${
                                selectedSeason === season.season_number
                                  ? styles.active
                                  : ""
                              }`}
                              onClick={() =>
                                getSeasonEpisodes(season.season_number)
                              }
                            >
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
                            </button>
                          ))}
                      </div>
                      {episodesLoading && (
                        <div className={styles.episodes_loading_container}>
                          <div className={styles.spinner}></div>
                          <p>Carregando episódios...</p>
                        </div>
                      )}
                      {!episodesLoading && episodes.length > 0 && (
                        <div className={styles.episodes_container}>
                          <h4>Episódios da Temporada {selectedSeason}</h4>
                          {episodes.map((ep) => (
                            <div key={ep.id} className={styles.episode_card}>
                              <img
                                src={
                                  ep.still_path
                                    ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                                    : "https://via.placeholder.com/300x169.png?text=MyFlix"
                                }
                                alt={`Cena do ${ep.name}`}
                                className={styles.episode_image}
                              />
                              {/* JSX ATUALIZADO DENTRO DO episode_info */}
                              <div className={styles.episode_info}>
                                <div className={styles.episode_header}>
                                  {/* Div para agrupar textos */}
                                  <div>
                                    <span className={styles.episode_number}>
                                      {selectedSeason}x{ep.episode_number}
                                    </span>
                                    <span className={styles.episode_title}>
                                      {ep.name}
                                    </span>
                                  </div>

                                  {/* O Botão para expandir */}
                                  <button
                                    className={styles.episode_toggle_button}
                                    onClick={() => handleToggleEpisode(ep.id)}
                                    aria-label="Ver sinopse"
                                  >
                                    {expandedEpisode === ep.id ? (
                                      <FaChevronUp />
                                    ) : (
                                      <FaChevronDown />
                                    )}
                                  </button>
                                </div>

                                {/* A Sinopse (condicional) */}
                                {expandedEpisode === ep.id && (
                                  <p className={styles.episode_overview}>
                                    {ep.overview || "Sem descrição."}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ... (Seção de Elenco e Recomendações) ... */}
            {cast.length > 0 && (
              <section className={styles.cast_section}>
                {/* ... conteúdo ... */}
              </section>
            )}
            {recommendations.length > 0 && (
              <section className={styles.recommendations_section}>
                {/* ... conteúdo ... */}
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
