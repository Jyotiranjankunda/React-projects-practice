import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {
  const dialog = useRef();

  // Here, instead of forwardRef and useImperativeHandle, we open and close the modal using useEffect.
  // open prop is passed by app component, which tells true or false, i.e, either to open or close the dialog.
  // Initially, when this Modal component is loaded, just after then useEffect is executed, and initially the value of open is false, so the modal doesn't open. 
  // Now, when we click on any card, then the open changes to true, which will make the useEffect to re-executed (i.e, on every change of dependency, which is the open prop here, the useEffect will re-execute.)
  // Anything that causes the component to re-render is a dependency for useEffect.

  // If we haven't used useEffect here, then before returning jsx, we are closing the modal, as initially value of prop is false, so it will throw an error that close is undefined.

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className='modal' ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal'),
  );
}

export default Modal;
