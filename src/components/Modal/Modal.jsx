import PropTypes from 'prop-types';
import './modal.css';

export default function Modal({ modalOpen, setModal, children }) {
    return (
        <div onClick={setModal} className={modalOpen ? "modal active" : "modal"}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    setModal: PropTypes.func,
    children: PropTypes.element
}
