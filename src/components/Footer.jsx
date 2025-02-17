const Footer = () => {
	return (
    <footer>
      <img src="./logo_footer.svg" alt="Logo" className="footer__logo" />
      <ul className="footer__list">
        <li className="footer__list-item">Home</li>
        <li className="footer__list-item">About</li>
        <li className="footer__list-item">Contact</li>
        <li className="footer__list-item">Privacy Policy</li>
        <li className="footer__list-item">Terms of Service</li>
      </ul>
      <div className="copyright">Copyright &copy; Game Library 2025</div>
    </footer>
  );
}
 
export default Footer;