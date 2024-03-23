// A modal is just like a dialog that pops up on the screen

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

// forwardRef is used to pass ref from one component to another component.
// forwardRef render functions accept exactly two parameters: props and ref. 

const ResultModal = forwardRef(function ResultModal({targetTime, timeRemaining, onReset}, ref) {
  const dialog = useRef();

  const userLost = (timeRemaining <= 0);
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  })

  return createPortal(
    // The dialog tag is by default hidden, to show it we need to add an "open" attribute. But this will not add an backdrop filter as most of the dialog boxes have. We need to do it programatically by sending a command to the browser to get this built-in prop. This is again a use case of ref. the function to show the dialog is showModal().
    
    <dialog className='result-modal' ref={dialog} onClose={onReset}>
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2>Your score : {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formattedTimeRemaining} seconds left.</strong></p>

        {/* When a <form> within a <dialog> is submitted via the dialog method, the dialog box closes without any javascript needed. */}
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;