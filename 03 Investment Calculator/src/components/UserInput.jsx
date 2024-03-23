import React from "react";

const UserInput = ({userInput, handleUserInput}) => {
    // We need this state values in this component, as well as in the Results component so as to calculate the result.
    // Therefore, we need to lift the state and the state updating function to the parent component (App) 

    /*
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 20000,
        duration: 10,
    });

    function handleChange(inputIdentifier, newValue) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [inputIdentifier]: newValue,
            };
        });
    }
    */

    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input
                        type="number"
                        required
                        onChange={(event) =>
                            handleUserInput("initialInvestment", event.target.value)
                        }
                        value={userInput.initialInvestment}
                    />
                    {/* Although we have set the type of input as number, still js executes its value as a string. And since, we need to typecast this value into number. */}
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input
                        type="number"
                        required
                        onChange={(event) =>
                            handleUserInput("annualInvestment", event.target.value)
                        }
                        value={userInput.annualInvestment}
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input
                        type="number"
                        required
                        onChange={(event) =>
                            handleUserInput("expectedReturn", event.target.value)
                        }
                        value={userInput.expectedReturn}
                    />
                </p>
                <p>
                    <label>Duration</label>
                    <input
                        type="number"
                        required
                        onChange={(event) =>
                            handleUserInput("duration", event.target.value)
                        }
                        value={userInput.duration}
                    />
                </p>
            </div>
        </section>
    );
};

export default UserInput;
