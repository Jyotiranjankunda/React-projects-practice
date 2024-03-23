import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

// A reducer is a function that reduce one or more complex values to a simpler one
function shoppingCartReducer(state, action) {
    if (action.type == "ADD_ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find(
                (product) => product.id === action.payload
            );
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state, // not needed here because we have just one value
            items: updatedItems,
        };
    }

    if (action.type == "UPDATE_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.count;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
}

export default function CartContextProvider({ children }) {
    /*
    - useReducer is an alternative to useState, helpful in managing complex states.
    - syntax: 
        const [currentState, dispatch] = useReducer(reducerFunction, initialState);
        reducerFunction(state, action){

        }
    - The dispatch function provides an action to the reducer func, bases on which it takes action upon the initial state, and changes it and returns the current state.
    */
   
    const [shoppingCartState, dispatch] = useReducer(shoppingCartReducer, {
        items: [],
    });

    // const [shoppingCart, setShoppingCart] = useState({
    //     items: [],
    // });

    function handleAddItemToCart(id) {
        dispatch({
            type: "ADD_ITEM",
            payload: id,
        });
        // setShoppingCart((prevShoppingCart) => {});
    }

    function handleUpdateCartItemQuantity(productId, count) {
        dispatch({
            type: "UPDATE_ITEM",
            payload: {
                productId,
                count,
            },
        });
        // setShoppingCart((prevShoppingCart) => {});
    }

    // Linking state to the context, by creatine custom value to the context, also we can change the state by using the function passes by the context.

    // This is how we can use context to share values and state updating functions to multiple components without using props.

    // The default value set when creating the context is only used if a component that was not wrapped by the Provider component tries to access the context value.
    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
