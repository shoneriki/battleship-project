import {useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, duration = 1000, type) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, message, duration, type }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const useSingleToast = (message, duration, type, trigger) => {
    useEffect(() => {
      if (trigger) {
        showToast(message, duration, type);
      }
    }, [trigger, message, duration, type, showToast]);
  }

  return { toasts, showToast, removeToast, useSingleToast}
}
