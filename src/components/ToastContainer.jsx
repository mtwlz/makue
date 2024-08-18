// src/components/ToastContainer.js
import React from 'react';
import { useToastContext } from '../contexts/ToastContext';
import Toast from './Toast';
import '../styles/toast.css';

const ToastContainer = () => {
  const { toasts } = useToastContext();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
