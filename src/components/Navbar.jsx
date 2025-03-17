import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <img src="../logo.svg" alt="Logo" className="logo" />
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
        <button className="open-menu__btn" onClick={openMenu}>
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </button>
        <div className="menu__overlay" onClick={closeMenu} />
        <div className="menu__backdrop">
          <div className="menu__header">
            <h3 className="menu__header--title">Menu</h3>
            <button className="close-menu__btn" onClick={closeMenu}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
          <ul className="menu__links">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "menu__link active-link"
                  : "menu__link"
              }
              onClick={closeMenu}
            >
              <li className="menu__list">
                <div className="menu__icon--wrapper">
                  <FontAwesomeIcon icon="fa-solid fa-house" />
                </div>
                <span className="menu__item">Home</span>
              </li>
            </Link>
            <Link
              to="/games"
              className={
                location.pathname === "/games"
                  ? "menu__link active-link"
                  : "menu__link"
              }
              onClick={closeMenu}
            >
              <li className="menu__list">
                <div className="menu__icon--wrapper">
                  <FontAwesomeIcon icon="fa-solid fa-gamepad" />
                </div>
                <span className="menu__item">Games</span>
              </li>
            </Link>
            <li className="menu__list no-cursor">
              <div className="menu__icon--wrapper">
                <FontAwesomeIcon icon="fa-solid fa-phone" />
              </div>
              <span className="menu__item">Contact</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
