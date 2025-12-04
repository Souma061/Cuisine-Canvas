import "./Footer.css";

/**
 * Footer Component
 * Bottom information section
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Cuisine Canvas</h4>
            <p>
              Experience the art of culinary innovation. Our restaurant menu
              showcases carefully crafted dishes from diverse cuisines, bringing
              flavors from around the world to your table.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ hello@cuisinecanvas.com</li>
              <li>📍 123 Food Street, Flavor City</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Cuisine Canvas. All rights reserved.</p>
          <p>Crafted with ❤️ for food lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
