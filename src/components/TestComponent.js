import React, {useEffect} from "react";
import { useToast } from "./useToast";

export const TestComponent = ({ message, duration, type }) => {
  const { showToast, toasts, removeToast } = useToast();

  useEffect(() => {
    showToast(message, duration, type);
  }, [message, duration, type, showToast]);

  return (
    <section>
      {toasts.map((toast) => (
        <section key={toast.id} data-testid="toast">
          {toast.message}
        </section>
      ))}
    </section>
  );
};
