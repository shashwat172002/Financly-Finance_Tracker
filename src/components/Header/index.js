import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../Hamburger/hamburger";
import { toggleTheme } from "../../themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const [user, loading] = useAuthState(auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {/* <button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </button> */}
      {user && (
        <>
          <HamburgerMenu />
        </>
      )}
    </div>
  );
}

export default Header;
