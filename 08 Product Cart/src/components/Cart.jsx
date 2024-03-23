import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";

export default function Cart() {
  const {items, updateItemQuantity} = useContext(CartContext);
  // using useContext is the standard way to consuming context, but there is another way to do that using .Consumer

  // When you access a context value in a component and that value then changes the component function then it will get re-executed by React, just as the component re-renderes when there is a change in state.

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
    // reduce function is used to reduce an array to a single value. Here, we are calculating the total sum of items based on their quantity, and storing that sum in accumulator (acc), starting with an initial value of 0.

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    /*
    <CartContext.Consumer>
      {
        (cartCtx) => {
          const totalPrice = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
        
          return (
            <div id="cart">
              // whole code
              // replace the items with cartCtx.items
            </div>
          );
        }
      }
    </CartContext.Consumer> 
    */

    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
