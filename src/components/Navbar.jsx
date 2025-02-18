import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <img src="./logo.svg" alt="Logo" className="logo" />
        </Link>
        <ul className="nav__list">
          <Link to="/">
            <li className="nav__list-item">
              <FontAwesomeIcon icon="fa-solid fa-house" />
              <span className="nav__list-item--text">Home</span>
            </li>
          </Link>
          <Link to="/games">
            <li className="nav__list-item">
              <FontAwesomeIcon icon="fa-solid fa-gamepad" />
              <span className="nav__list-item--text">Games</span>
            </li>
          </Link>
          <li className="nav__list-item no-cursor">
            <FontAwesomeIcon icon="fa-solid fa-phone" />
            <span className="nav__list-item--text">Contact</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;