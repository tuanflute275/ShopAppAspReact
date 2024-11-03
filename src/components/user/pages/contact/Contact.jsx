import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    const newErrors = {};
    if (!contactForm.name) newErrors.name = "Name is required!";
    if (!contactForm.email) newErrors.email = "Email is required!";
    if (!contactForm.phone) newErrors.phone = "Phone is required!";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form logic
      console.log(contactForm);
    }
  };

  return (
    <main>
      <div className="text-center box-title">
        <nav className="breadcrumb text-center d-flex justify-content-center">
          <a className="breadcrumb-item default" href="/">
            Home
          </a>
          <span className="breadcrumb-item active">Contact</span>
        </nav>
        <h3 className="title">Contact Us</h3>
        <div className="container"></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h2 className="contact-form-title mb-3 font-weight-bold">
              Get In Touch
            </h2>
            <p className="contact-form-desc">Comments, questions?</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your name*"
                  value={contactForm.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email*"
                    value={contactForm.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Your Number*"
                    value={contactForm.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div style={{ color: "red" }}>{errors.phone}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" id="btn-submit">Submit</button>
            </form>
          </div>
          <div className="col-md-4">
            <div className="contact-info-wrap pt-5">
              <ul className="contact-info">
                <li>
                  <i className="fa fa-phone"></i>
                  <a href="tel:0982467073">(+84)982467073</a>
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:tuanflute275@gmail.com">
                    tuanflute275@gmail.com
                  </a>
                </li>
                <li>
                  <i className="fa fa-message"></i>
                  <a
                    href="https://www.facebook.com/profile.php?id=100047425502024"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live chat with Facebook
                  </a>
                </li>
                <li>
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  <a
                    href="https://bachkhoa-aptech.edu.vn/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    238 Hoang Quoc Viet
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6653032780077!2d105.79398507492957!3d21.04607398060757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3adfaac9f3%3A0xc95adc91a647bf66!2zMjM4IEhvw6BuZyBRdeG7kWMgVmnhu4d0LCBOZ2jEqWEgVMOibiwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1719634806965!5m2!1svi!2s"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
};

export default Contact;
