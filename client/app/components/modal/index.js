import React from 'react';

const Modal = ({ isOpen, toggleModal, title, children, salvar }) => {
    return (
        <>
            {/* Modal Backdrop - Camada clara de fundo */}
            {isOpen && <div className="modal-backdrop fade show custom-backdrop" />}

            {/* Modal */}
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                id="exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title || 'Modal title'}</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={toggleModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={toggleModal}
                            >
                                Fechar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={
                                    salvar
                                }
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
