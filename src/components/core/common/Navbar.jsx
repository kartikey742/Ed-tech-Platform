import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../../data/navbar-links";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/Logo/Logo-Full-Light.png";
import { CTAButton } from "../../core/homepage/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileDropDown from "../Dashboard/ProfileDropDown";
import { FiMenu, FiX } from "react-icons/fi";   

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [tab, setTab] = useState(NavbarLinks[0]);
  const [subLinks, setSubLinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // toggle for mobile menu

  const fetchSubLinks = async () => {
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      if (res && res.data && Array.isArray(res.data.data)) {
        setSubLinks(res.data.data);
      } else {
        setSubLinks([]);
        console.log("No categories found or response format is incorrect.");
      }
    } catch (err) {
      console.log("API error:", err);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div id="nav" className={menuOpen ? "active" : ""}>
      {/* Logo */}
      <img src={logo} alt="Logo" style={{ height: "40px" }} />

   

      {/* Nav Links */}
      <div id="indiv" className={menuOpen ? "show" : ""}>
        {NavbarLinks.map((ele, idx) => (
          <div key={idx} onClick={() => setTab(ele)}>
            {ele.title === "Catalog" ? (
              <div className="linkwrapper">
                <Link id="link">
                  <div className="linkcontent">
                    <p>{ele.title}</p>
                    <IoIosArrowDropdownCircle />
                  </div>
                </Link>
                <div className="dropdownbox">
                  {subLinks.length > 0 ? (
                    subLinks.map((ele, index) => (
                      <Link
                        to={`/catalog/${ele.name.split(" ").join("-").toLowerCase()}`}
                        key={index}
                      >
                        <div id="cat">{ele.name}</div>
                      </Link>
                    ))
                  ) : (
                    <div>No categories found</div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                id="link"
                to={ele.path}
                style={{ color: tab.path === ele.path ? "#FFD60A" : "white" }}
              >
                {ele.title}
              </Link>
            )}
          </div>
        ))}
        <div id="logsinbtn">
            {token == null ? (
          <div className="auth-btns">
            <CTAButton linkto={"/login"}>Log in</CTAButton>
            <CTAButton linkto={"/signup"} active={true}>
              Sign up
            </CTAButton>
          </div>
        ) : (
          <ProfileDropDown />
        )}
        </div>
      </div>

      {/* Cart + Auth/Profile */}
      <div id="btnpro">
        {user && user?.accountType !== "Instructor" && (
          <Link to={"/dashboard/cart"}>
            <AiOutlineShoppingCart size={25} color="white" />
            <sup
              style={{
                color: "white",
                fontWeight: "bold",
                position: "relative",
                bottom: "10px",
              }}
            >
              {totalItems > 0 && totalItems}
            </sup>
          </Link>
        )}
          <div id="logsinbtn2">
            
        {token == null ? (
          <div className="auth-btns">
            <CTAButton linkto={"/login"}>Log in</CTAButton>
            <CTAButton linkto={"/signup"} active={true}>
              Sign up
            </CTAButton>
          </div>
        ) : (
          <ProfileDropDown />
        )}
        </div>
      </div>
         {/* Hamburger (only visible on mobile) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={28} color="white" /> : <FiMenu size={28} color="white" />}
      </div>
    </div>
  );
};
