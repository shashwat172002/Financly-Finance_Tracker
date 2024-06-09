// MenuItem.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const MenuItem = () => {
  function logoutFnc() {
    auth.signOut();
    navigate("/");
  }
  const navigate = useNavigate();
  return (
    <div className="menu-item">
      <p className="logo link" onClick={logoutFnc}>
        Logout
      </p>
      
    </div>
  );
};

export default MenuItem;
