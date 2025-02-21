import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
    <footer>
      <div className="footer__container">
        <Link to="/">
          <img src="./logo_footer.svg" alt="Logo" className="footer__logo" />
        </Link>
        <ul className="footer__list">
          <Link to="/">
            <li className="footer__list-item">Home</li>
          </Link>
          <li className="footer__list-item no-cursor">About</li>
          <li className="footer__list-item no-cursor">Contact Us</li>
          <li className="footer__list-item no-cursor">Privacy Policy</li>
          <li className="footer__list-item no-cursor">Terms of Use</li>
        </ul>
        <div className="copyright">&copy; 2025 Game Library</div>
        <div className="socials__list">
          <div className="socials__icon">
            <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
          </div>
          <div className="socials__icon">
            <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
          </div>
          <div className="socials__icon">
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
          </div>
          <div className="socials__icon">
            <FontAwesomeIcon icon="fa-brands fa-discord" />
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;