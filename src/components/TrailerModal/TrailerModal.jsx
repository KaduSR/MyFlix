import Modal from "react-modal";
import YouTube from "react-youtube";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef } from "react";
import styles from "./TrailerModal.module.css";

// CONFIGURAÇÃO ESSENCIAL: Diz ao Modal qual é o elemento principal da sua aplicação.
Modal.setAppElement("#root");

function TrailerModal({ isOpen, onRequestClose, trailerKey }) {
  const closeBtnRef = useRef(null);

  // Foca o botão fechar quando o modal abrir (melhora a acessibilidade)
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Opções para o player YouTube — usamos 100% para permitir controle via CSS
  const ytOpts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button
        ref={closeBtnRef}
        aria-label="Fechar trailer"
        className={styles.closeButton}
        onClick={onRequestClose}
      >
        <FaTimes size={18} />
      </button>

      <div
        className={styles.content}
        // garante que cliques no content não fechem o modal
        onClick={(e) => e.stopPropagation()}
      >
        {trailerKey ? (
          <div className={styles.videoWrapper}>
            <YouTube videoId={trailerKey} opts={ytOpts} />
          </div>
        ) : (
          <p>Trailer indisponível</p>
        )}
      </div>
    </Modal>
  );
}

export default TrailerModal;
