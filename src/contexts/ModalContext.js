// src/context/ModalContext.js
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    context: 'primary',
    pulsate: false,
    content: null,
    onOkay: () => {},
    onCancel: () => {},
  });

  const openModal = (props) => setModalProps({ ...props, isOpen: true });
  const closeModal = () => setModalProps((prev) => ({ ...prev, isOpen: false }));

  return (
    <ModalContext.Provider value={{ modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
