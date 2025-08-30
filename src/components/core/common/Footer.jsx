import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet", 
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Top Section */}
        <div className="footer-top">
          {/* Left */}
          <div className="footer-left">
            <div className="footer-logo">
              <img src={Logo} alt="Logo" />
              <h1 className="footer-heading">Company</h1>
              <div>
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div key={i} className="footer-link">
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="footer-social">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div>
              <h1 className="footer-heading">Resources</h1>
              {Resources.map((ele, index) => (
                <div key={index} className="footer-link">
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              ))}

              <h1 className="footer-heading" style={{ marginTop: "1.75rem" }}>
                Support
              </h1>
              <div className="footer-link">
                <Link to="/help-center">Help Center</Link>
              </div>
            </div>

            <div>
              <h1 className="footer-heading">Plans</h1>
              {Plans.map((ele, index) => (
                <div key={index} className="footer-link">
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              ))}

              <h1 className="footer-heading" style={{ marginTop: "1.75rem" }}>
                Community
              </h1>
              {Community.map((ele, index) => (
                <div key={index} className="footer-link">
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="footer-right">
            {FooterLink2.map((ele, i) => (
              <div key={i}>
                <h1 className="footer-subtitle">{ele.title}</h1>
                {ele.links.map((link, index) => (
                  <div key={index} className="footer-link">
                    <Link to={link.link}>{link.title}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-links">
          {BottomFooter.map((ele, i) => (
            <div key={i}>
              <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
            </div>
          ))}
        </div>
        <div>Made with ❤️ © 2025 Studynotion</div>
      </div>
    </div>
  );
};

export default Footer;
