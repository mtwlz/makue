// src/components/Modal.js
import React from 'react';
import '../styles/modal.css';
import Button from './Button';
import { useModalContext } from '../contexts/ModalContext';
import Icon from './Icon';

const Modal = () => {
    const { modalProps, closeModal } = useModalContext();

    return (
        <div className={`modal-overlay ${modalProps.isOpen ? 'open' : ''}`} aria-label='Modal Overlay'>
            <div
                className={`modal ${modalProps.isOpen ? 'open' : ''} ${modalProps.pulsate ? 'pulsate' : ''} ${modalProps.context || ''}`}
                aria-label={`${modalProps.isOpen ? 'open' : 'closed'} Modal`}
            >
                {modalProps.icon && (
                    <Icon 
                        custom='modal-icon'
                        icon={modalProps.icon?.name || 'question'}
                        bounce={modalProps.icon?.bounce || false}
                        spin={modalProps.icon?.spin || false}
                        flip={modalProps.icon?.flip || false}
                        shake={modalProps.icon?.shake || false}
                        beat={modalProps.icon?.beat || false}
                        fade={modalProps.icon?.fade || false}
                        context={modalProps.context || ''}
                        aria-label='Modal Icon'
                    />
                )}
                <div className={`modal-title ${modalProps.context}-title ${modalProps.isOpen ? 'open' : ''}`} aria-label={modalProps.title}>{modalProps.title}</div>
                <div className={`modal-content`} aria-label={`${modalProps.title} Content`}>{modalProps.content}</div>
                <div className={`modal-buttons ${modalProps.isOpen ? 'open' : ''}`}>
                    <Button context={modalProps.context} onClick={modalProps.onOkay} bordered aria-label='Modal Okay Button'>
                        Okay
                    </Button>
                    <Button onClick={closeModal} bordered aria-label='Modal Cancel Button'>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
