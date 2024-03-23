import { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !editing);

        // It is always recommended to change the state by using a function instead of value, in cases where the new state depends on the previous state value.

        // For e.g, here we could have simply change the isEditing value by using setIsEditing(!isEditing), but the problem is that react doesn't immediately change that state, insted, it will put that function in queue, and executes when react that time, although that wait is very very small. But by using an arrow function, it immediately changes the state, and we always get the updated value.

        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(e){
        setPlayerName(e.target.value);

        // The onChange function will provide us with an object, that contains the value that is changed in the input field. The object can be received as a parameter without passing it in the function. Here, we have taken the parameter as 'e', and 'e' object has a target key, which has a value property and that contains the actual value that is changed by the user. And we are setting that new value to our playerName state.
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;

        // Here, we are changing the value of input on clicking the edit button by the onChange attribute, and again setting that user entered value into the value attribute of the input field.

        // This way of listening to a change on the input and then feeding that updated value back into this input is also called two-way binding.
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}

export default Player;
