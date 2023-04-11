import React, {useState, useEffect} from 'react'
import { useToast } from './useToast'
import styled, {keyframes} from "styled-components"

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
;`

const fadeOut = keyframes`
  from{
    opacity: 1;
  } to {
    opacity: 0
  }
  ;`

export const ToastWrapper = styled.section`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 9999;
`

export const ToastMessage = styled.section`
  background-color: ${({ type }) => {
    if (type === "warning") {
      return "#f0ad4e";
    } else if (type === "danger") {
      return "#d9534f";
    } else if (type === "success") {
      return "#90ee90";
    } else if (type === "win") {
      return "#0275d8";
    } else if (type === "lose") {
      return "#ee4b24";
    } else {
      return "#0275d8";
    }
  }};
  color: #fffafa;
  padding: 8px 16px;
  border-radius: 16px;
  margin-bottom: 8px;
  font-size: 16px;
  text-align: center;
  opacity: ${({ show }) => (show ? 1 : 0)}
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;


const Toast = ({message, duration=1000, onRemove, type}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onRemove();
    }, duration);

    return () => {
      clearTimeout(timer)
    }
  },[message, duration, onRemove, type])
  return (
      <ToastMessage
        className={`toast-container ${show ? "show" : "hide"}`}
        show={show}
        type={type}
      >
        {message}
      </ToastMessage>
  );
}

export default Toast
