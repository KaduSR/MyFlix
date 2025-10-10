import styles from "./Header.module.css";

function Header() {
  return (
    <Header className={styles.header}>
      <nav>
        <h2>MeuFlix</h2>
      </nav>
    </Header>
  );
}

export default Header;
