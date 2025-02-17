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
          <li className="nav__list-item">
            <FontAwesomeIcon icon="house" />
          </li>
          <li className="nav__list-item">About</li>
          <li className="nav__list-item">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;