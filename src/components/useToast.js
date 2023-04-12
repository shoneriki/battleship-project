import {useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, duration = 1000, type, persistent = false) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, message, duration, type, persistent }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const removePersistentToast = (type) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.type !== type || !toast.persistent));
  }

  const useSingleToast = (message, duration, type, trigger, persistent = false) => {
    useEffect(() => {
      if (trigger) {
        showToast(message, duration, type, persistent);
      } else if (persistent) {
        removePersistentToast(type);
      }
    }, [trigger, message, duration, type]);
  }

  return { toasts, showToast, removeToast, useSingleToast, removePersistentToast}
}
