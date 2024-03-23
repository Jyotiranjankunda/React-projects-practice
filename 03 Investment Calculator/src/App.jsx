import React from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import { useState } from "react";
import Results from "./components/Results";

const App = () => {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });

    // If duration entered is less than 1, then it is meaningless.
    // So, we should add conditional rendering of result based on value of duration, whether it is valid or not.

    const isValidDuration = (userInput.duration >= 1);

    function handleChange(inputIdentifier, newValue) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [inputIdentifier]: +newValue,
                // When we enter the a new value, although the type of input is number, it treats it as a string, and hence we need to typecast it into number before doing calculations. By adding a + sign in front newValue, it typecase its value into number.
            };
        });
    }

    return (
        <>
            <Header />
            <UserInput userInput={userInput} handleUserInput={handleChange}/>
            {isValidDuration ? <Results input={userInput}/> : <p className="center">Please enter a valid duration value</p>}
        </>
    );
};

export default App;
