import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { BiSearchAlt2 } from "react-icons/bi";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // Hook para navegar programaticamente

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (!search) return; // Não faz nada se a busca estiver vazia

    navigate(`/search?q=${search}`);
    setSearch(""); // Limpa o campo de busca após a pesquisa
  };

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">
          <h2>MyFlix</h2>
        </Link>

        <form className={styles.search_form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busque por um filme"
            className={styles.search_input}
            onChange={(e) => setSearch(e.target.value)} // Atualiza o estado a cada letra digitada
            value={search} // O valor do input é controlado pelo estado
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
