import React from "react";
import "./userFooter.css";
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <footer>
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <div class="col-md-6 newsletter_text">
            <h3 class="text-uppercase">KEEP CONNECTED</h3>
            <p>Get updates by subscribe our weekly newsletter</p>
          </div>
          <div class="col-md-6 newsletter_subscribe">
            <form action="#">
              <i class="fa fa-envelope"></i>
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
              <div class="line"></div>
            </form>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row justify-content-between align-items-center">
          <div class="col-md-5">
            <div class="footer_widget_list">
              <div class="footer_logo">
                <a routerLink="/home">
                  <img src="/logo.jpg" alt="" />
                </a>
              </div>
              <div class="footer_contact_list">
                <span>Our Location</span>
                <p>238 Hoàng Quốc Việt - Hà Nội.</p>
              </div>
              <div class="footer_contact_list">
                <span>24/7 hotline:</span>
                <div style={{ marginTop: "10px" }}></div>
                <a href="tel:0982467073">(+84)982467073</a>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="footer_widget_list">
              <div class="footer_menu">
                <ul class="d-flex justify-content-end">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/shop"}>Shop</Link>
                  </li>
                  <li>
                    <Link to={"/faq"}>Faq</Link>
                  </li>
                  <li>
                    <Link to={"/blog"}>Blog</Link>
                  </li>
                  <li>
                    <Link to={"/contact"}>Contact</Link>
                  </li>
                </ul>
              </div>
              <div class="footer_social">
                <div class="social-buttons d-flex justify-content-end">
                  <a
                    href="https://www.facebook.com/profile.php?id=100047425502024"
                    target="_blank"
                    class="social-button social-button--facebook"
                    aria-label="Facebook"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tu%E1%BA%A5n-flute-166331275/"
                    target="_blank"
                    class="social-button social-button--linkedin"
                    aria-label="LinkedIn"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://www.snapchat.com/"
                    target="_blank"
                    class="social-button social-button--snapchat"
                    aria-label="Snapchat"
                  >
                    <i class="fab fa-snapchat-ghost"></i>
                  </a>
                  <a
                    href="https://github.com/tuanflute275"
                    target="_blank"
                    class="social-button social-button--github"
                    aria-label="GitHub"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                  <a
                    href="https://codepen.io/"
                    target="_blank"
                    class="social-button social-button--codepen"
                    aria-label="CodePen"
                  >
                    <i class="fab fa-codepen"></i>
                  </a>
                </div>
              </div>
              <div class="copyright_right d-flex justify-content-end mt-3">
                <p>© Do not copy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
