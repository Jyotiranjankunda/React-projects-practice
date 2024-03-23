import { useState, useRef, useImperativeHandle, forwardRef } from "react";

function Player() {
    const [enteredPlayerName, setEnteredPlayerName] = useState("Player");

    // useRef is used to manipulate dom elements just as we do in vanila js. we can create a reference for any element by using the ref attribute, and then by using .current object, we can manipulate all the properties, styles etc. of that element.
    const playerName = useRef();

    function handleClick() {
      // playerName.current.value holds of value of input that user enters.
        setEnteredPlayerName(playerName.current.value);

        // After changing the name, the input will be cleared.
        playerName.current.value = '';

        // But as an rule, we must not write declarative code and manipuate dom. Let react do it.
    }

    return (
        <div>
            <section id="player">
                {/* ?? is called nullish coleasing operator. It is kind of shortcut for ternary operator, i.e, display enteredPlayerName if it is true, else Player */}
                <h2>Welcome {enteredPlayerName ?? "Player"}</h2>
                <p>
                    <input
                        type="text"
                        ref={playerName}
                        placeholder="Enter your name"
                    />
                    <button onClick={handleClick}>Set Name</button>
                </p>
            </section>
        </div>
    );
}

export default Player;

/*
Difference between State and Ref

State
1. Causes component re-evaluation (re-execution) when changed
2. Should be used tor values that are directly retlected in the Ul
3. Should not be used for "behind the scenes" values that have no direct UI impact.

Ref
1. Do not cause component re-evaluation when changed
2. Can be used to gain direct DOM element access (great for reading values or accessing certain browser APIs)
*/