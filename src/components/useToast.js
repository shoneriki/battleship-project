import {useState} from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, duration = 1000, type) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, duration, type }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  return { toasts, showToast, removeToast}
}
