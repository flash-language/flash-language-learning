import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/collections">Collections</NavLink>
        </li>
        <li>
          <NavLink to="/flashcards">Flashcards</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
