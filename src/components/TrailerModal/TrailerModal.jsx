import Modal from "react-modal";
import YouTube from "react-youtube";
import { FaTimes } from "react-icons/fa";
import styles from "./TrailerModal.module.css";

function TrailerModal({ isOpen, onRequestClose, trailerKey }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.close_modal_button} onClick={onRequestClose}>
        <FaTimes size={20} />
      </button>
      {trailerKey && (
        <YouTube videoId={trailerKey} className={styles.youtube_player} />
      )}
    </Modal>
  );
}

export default TrailerModal;
