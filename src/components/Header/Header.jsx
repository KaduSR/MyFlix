import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <h2>MyFlix</h2>
      </nav>
    </header>
  );
}

export default Header;
