import logo from "../assets/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ["Fundamental", "Core", "Crucial"];

function generateRandomDesc(n) {
  return Math.floor(Math.random() * (n + 1));
}

function Header() {
  const description = reactDescriptions[generateRandomDesc(2)];
  return (
    <header>
      <img src={logo} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

export default Header;
