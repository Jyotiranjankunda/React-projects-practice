import { log } from '../../log.js';
import { memo } from 'react';

// In this component, although after using memo, it is still being rendered, as memo compares props.

// Now in the props children prop is just a text, so it will not change, the icon prop is a svg image, it will not change, but the remaining props is a function that is handling the increment or decrement in the counter component.

// And whenever the counter component changes, then it also create the same function again, but in js, functions are objects which will occupy different memory space and are not equal. So, we have to use useCallback on those functions in the counter component, to prevent creation of same function again and again, and also to prevent the execution of icon button.

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;