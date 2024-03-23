import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import CustomInput from "./CustomInput";

// We can created styled components such as this, and can apply normal css properties, and use this as a tag in JSX code.

const ControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleInputChange(identifier, value) {
        if (identifier === "email") {
            setEnteredEmail(value);
        } else {
            setEnteredPassword(value);
        }
    }

    function handleLogin() {
        setSubmitted(true);
    }

    const emailNotValid = submitted && !enteredEmail.includes("@");
    const passwordNotValid = submitted && enteredPassword.trim().length < 6;

    return (
        <div id="auth-inputs">
            <ControlContainer>
                {/*
                <p>
                    We can also set multiple classes conditionally using template literals. Like here, we want the label class to static class, but the invalid class to be set conditionally bases on emailNotValid is true or false

                    className={`label ${emailNotValid ? "invalid" : ""}`} 

                    This Label styled component also passes the props as the attributes to the built-in original label component, and therefore we need not worry for applying the attributes.

                    <Label $invalid={emailNotValid}>Email</Label> 

                    When the email is invalid, we need to apply the class as invalid, which makes the label red in color.

                    Same thing we can do by props, i.e, pass the 'emailNotValid' state variable by props to the Label styled component, and use the conditional styling there. 
                    
                    Also, by convention, any props that you want for styled components, use it with dollar sign, so that not to clash with built-in attributes
                    
                    Similarily, this custom will also pass all the props to the built in input tag as the attributes. 

                    <Input
                        type="email"
                        $invalid={emailNotValid}
                        onChange={(event) =>
                            handleInputChange("email", event.target.value)
                        }
                    /> 
                    
                    We can conditionally set the properties using style attribute also.

                    style={{
                      backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db"
                    }}

                    We can also set the className conditionally by using {} and ternary operators
                    className={emailNotValid ? "invalid" : undefined} 
                </p>
                */}

                {/* <p>
                    <Label
                        // className={`label ${emailNotValid ? "invalid" : ""}`}
                        $invalid={passwordNotValid}
                    >
                        Password
                    </Label>
                    <Input
                        type="password"
                        $invalid={passwordNotValid}
                        onChange={(event) =>
                            handleInputChange("password", event.target.value)
                        }
                        // className={passwordNotValid ? "invalid" : undefined}
                    />
                </p> */}

                <CustomInput 
                    label="Email"
                    invalid={emailNotValid}
                    type="email"
                    onChange={(event) => handleInputChange('email', event.target.value)}
                />

                <CustomInput 
                    label="Password"
                    invalid={passwordNotValid}
                    type="password"
                    onChange={(event) => handleInputChange('password', event.target.value)}
                />
                
            </ControlContainer>

            <div className="actions">
                <button type="button" className="text-button">
                    Create a new account
                </button>
                <Button onClick={handleLogin}>
                    Sign In
                </Button>
            </div>
        </div>
    );
}
