import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { BiSearchAlt2 } from "react-icons/bi"; // Importa o ícone de busca

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        {/* O logo agora é um link para a página inicial */}
        <Link to="/">
          <h2>MyFlix</h2>
        </Link>

        <form className={styles.search_form}>
          <input
            type="text"
            placeholder="Busque por um filme"
            className={styles.search_input}
          />
          <button type="submit" className={styles.search_button}>
            <BiSearchAlt2 size={20} />
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Header;
