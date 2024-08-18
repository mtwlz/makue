import React, { createContext, useState, useContext } from 'react';

export const ToastContext = createContext();

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toastConfig) => {
    setToasts([...toasts, { ...toastConfig, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
