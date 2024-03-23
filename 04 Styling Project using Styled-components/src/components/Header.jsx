import logo from "../assets/logo.png";

// CSS modules are scoped to particular components in which they are used. If we use any class or id in a particular component, then that styles are applied to the elements in that particular elements only, in which we have used the css modules, and not in the whole project.

import classes from "./Header.module.css";

// CSS code is not scoped to components - CSS rules may clash across components (e.g, same CSS class name used in different components for different purposes)

import styled from "styled-components";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;

    & img {
        object-fit: contain;
        margin-bottom: 2rem;
        width: 11rem;
        height: 11rem;
    }

    & h1 {
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: 0.4em;
        text-align: center;
        text-transform: uppercase;
        color: #9a3412;
        font-family: "Pacifico", cursive;
        margin: 0;
    }

    & p {
        text-align: center;
        color: #a39191;
        margin: 0;
    }

    @media (min-width: 768px) {
        margin-bottom: 4rem;

        & h1 {
            font-size: 2.25rem;
        }
    }
`;

// Here, & is used to refer the parent element, under which all its nested components are styled.
// In the media queries, we have styled the header{margin-bottom: 4rem}, since we are refering the parent element itself, so omitted the &

export default function Header() {
    return (
        <StyledHeader>
            <img src={logo} alt="A canvas" />
            <h1>ReactArt</h1>

            {/* Inline styling is not given in string, instead in dynamic syntax. And inside that an object of styles is given.*/}
            {/* In the inline styles, properties are written in camel case. */}

            {/* <p style={{
                  color: 'blue',
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  padding: '10px'
                }}>A community of artists and art-lovers.</p> 
            */}

            {/* While using css modules, classname or id is not given in the form of string, rather it is given as a object.classname or object.id*/}

            {/* <p className={classes.paragraph}>A community of artists and art-lovers.</p> */}
            {/* <span id={classes.span}>Hello friends</span> */}

            {/* If suppose, any other file have the same className as paragraph, then that will be not affected by this style and vice-versa. */}

            <p>A community of artists and art-lovers.</p>
        </StyledHeader>
    );
}
