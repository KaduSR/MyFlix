import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaHeart,
  FaFilm,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        {/* Logo Section */}
        <div className={styles.footer_section}>
          <div className={styles.logo_section}>
            <Link to="/" onClick={scrollToTop}>
              <h3 className={styles.footer_logo}>
                <FaFilm /> MyFlix
              </h3>
            </Link>
            <p className={styles.footer_description}>
              Sua plataforma para descobrir os melhores filmes e séries do
              momento. Explore, avalie e compartilhe suas experiências
              cinematográficas.
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className={styles.footer_section}>
          <h4>Navegação</h4>
          <ul className={styles.footer_links}>
            <li>
              <Link to="/" onClick={scrollToTop}>
                Início
              </Link>
            </li>
            <li>
              <a
                href="#filmes"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                Filmes
              </a>
            </li>
            <li>
              <a
                href="#series"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                Séries
              </a>
            </li>
            <li>
              <a
                href="#tendencias"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                Tendências
              </a>
            </li>
          </ul>
        </div>

        {/* Info Section */}
        <div className={styles.footer_section}>
          <h4>Informações</h4>
          <ul className={styles.footer_links}>
            <li>
              <a
                href="#sobre"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Seção em desenvolvimento! 🚀");
                }}
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Entre em contato através das redes sociais! 📧");
                }}
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="#termos"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Termos de uso em breve! 📄");
                }}
              >
                Termos de Uso
              </a>
            </li>
            <li>
              <a
                href="#privacidade"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Política de privacidade em breve! 🔒");
                }}
              >
                Privacidade
              </a>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div className={styles.footer_section}>
          <h4>Conecte-se</h4>
          <div className={styles.social_links}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              title="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <p className={styles.api_credit}>
            Powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDB API
            </a>
          </p>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <div className={styles.divider}></div>
        <p className={styles.copyright}>
          © {currentYear} MyFlix. Feito com{" "}
          <FaHeart className={styles.heart_icon} /> para os amantes de cinema
        </p>
      </div>
    </footer>
  );
}

export default Footer;
