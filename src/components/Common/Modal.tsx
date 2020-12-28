import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalPortal: React.FC = ({ children }) => {
  const elementRef = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    elementRef.current = document.querySelector('#modal-root') as HTMLElement;
    setMounted(true);
  }, [mounted, setMounted]);

  return mounted
    ? createPortal(children, elementRef.current as HTMLElement)
    : null;
};
