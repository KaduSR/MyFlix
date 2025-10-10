import styles from './Header.module.css';

function Header() { 
    return (
        <Header className={styles.header}>
            <nav>
                <h2>MyFlix</h2>
                {/* Futuramente, aqui vou colocar uma barra de pesquisa */}
            </nav>
        </Header>
    )
}

export default Header;