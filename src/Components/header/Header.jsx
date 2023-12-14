import React, { useEffect, useState } from "react";
import "./header.scss";
import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState("");
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000); 
    }
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
   
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const navigationHandler = (type) => {
    if(type === "tv"){
      navigate("/explore/tv")
    }
    else if(type === "movie"){
      navigate("/explore/movie")
    }
    setMobileMenu(false)
  }

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavbar = () => {
    if(window.scrollY > 200) {
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide");
      }
      else{
        setShow("show");
      }
    }
    else{
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () =>  {window.removeEventListener("scroll", controlNavbar)}
  }, [lastScrollY])

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={ () => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {!mobileMenu ? (
            <SlMenu onClick={openMobileMenu} />
          ) : (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              type="text"
              placeholder="Seach for a movie or tv show...."
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
}

export default Header;
