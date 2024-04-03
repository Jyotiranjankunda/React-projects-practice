import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  // We want to make this delete component such that, even if user doesn't click on confirm button, it will be automatically deleted after 3 seconds.

  /*
  setTimeout(() => {
    onConfirm();
  }, 3000);
  */

  // Only by doing this, it won't work, as this delete component is a part of modal component which is a part of app component, as the app component loads, these all chidren components are also loaded, and hence they are always the part of the DOM. And therefore, this timer will always be set as soon as the app component is loaded. To solve this problem, we can conditionally render the children of modal component, i.e, if open prop is true, then only show the delete component, else null.

  // One more problem is that, once this timer is started, it won't stop, so even if user clicks on NO, the card will still be deleted.

  // These all problems can be solved by useEffect. Using useEffect, the timer will set only after the whole component is loaded.

  useEffect(() => {
    console.log("Timer set");
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    // useEffect also returns a function that works "JUST BEFORE THIS COMPONENT DISMOUNTS FROM THE DOM.". Now, if user clicks on NO, then the card is removed from the dom, i.e, this delete component dismounts from the dom, and due to useEffect, the timer is stopped.

    return () => {
      console.log("Timer removed");
      clearTimeout(timer);
    }

    // Here, we should not add the onConfirm prop as a dependency to the useEffect, as it is a function. We should add any values or strings or any primitive data types as an dependency, but functions are objects, whenever the component is re-rendered, a new function of the same name and same code is created, but in js they both are different. Same case with objects. 2 objects having same skeleton are not equal. 

    // Here, the onConfirm prop triggers the handleRemovePlace function in the app component, and in that function, some state is updating, which causes the app to render again, which will then pass that function to the delete component as a prop, then the useEffect will compare the old function to new function which found to be different (even though they are same), and hence useEffect run again and call the handleRemovePlace function.. and so on.

    // But to get rid of it, we can use useCallback hook. That will keep snapshot of the function and whenever the component will be rendered again, the new function won't be created that is inside the callback hook. Hence the infinite loop problem will be solved.

    // So, either don't use functions are dependencies inside the useEffect hook, or if you are adding them as dependencies, then wrap that function with useCallback hook.
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER}/>
    </div>
  );
}
