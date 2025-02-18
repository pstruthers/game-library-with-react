import { Link } from "react-router-dom";

const Footer = () => {
	return (
    <footer>
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
    </footer>
  );
}
 
export default Footer;