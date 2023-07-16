import React, { useState } from "react";
import { voyageService } from "../services";
import styles from '../styles/Modal.module.css';

interface Values {
  voyageId: any
}

interface PropTypes {
  hide: any,
  modalInfo: any
}

const Modal = ({ hide, modalInfo }: PropTypes) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  function onSubmit() {
    voyageService.deleteVoyage(modalInfo.id).then(res => {
      console.log(res);
    })
    // modalInfo.id
    setIsSubmitting(true);
  }

  return (
    <>
      <div className={styles.modalOverlay1} />
      <div
        className={styles.modalWrapper1}
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className={styles.customModal}>
          <div className={styles.modalHeader1}>
            <button
              type="button"
              className={styles.modalCloseButton}
              data-dismiss="modal"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>
            <div className="form-group">
              <label htmlFor="">Sefer Tarihi : </label>
              <p>{modalInfo.day.slice(0, 10).split("-").reverse().join("-")} {modalInfo.day?.slice(12, 16)}</p>
            </div>
            <div className="form-group">
              <label htmlFor="">Yolcu Sayısı : </label>
              <p>6</p>
            </div>
            <div className="form-group">
              <label htmlFor="">Toplam Kazanılan Para : </label>
              <p>{Math.floor(6 * Number(modalInfo?.fee))}₺</p>
            </div>
            <div className="form-group">
              <label htmlFor="">Boş Koltuk : </label>
              <p>{Math.floor(modalInfo.seatCount - 6)}</p>
            </div>

            <button
              disabled={isSubmitting}
              onSubmit={() => onSubmit()}
              className="btn btn-success">
              {isSubmitting &&
                <span className="spinner-border spinner-border-sm mr-1"></span>}
              Seferi Sil
            </button>
          </p>
        </div>
      </div>
    </ >
  );
};
export default Modal;
