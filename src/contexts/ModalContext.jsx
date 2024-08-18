import React, { createContext, useContext, useState } from 'react';

// Create the ModalContext
const ModalContext = createContext();

// ModalProvider to wrap around components
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

// Custom hook to access the ModalContext
export const useModalContext = () => useContext(ModalContext);

// Export the ModalContext itself
export { ModalContext };
