import React, { useEffect } from 'react'
import "./styles.css"
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../Hamburger/hamburger';

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <div className='navbar'>
    <p className='logo'>
      Financely.
    </p>
    {user && (
      <>
      <HamburgerMenu />
     
    </>
    )}
    
    </div>
  )
}

export default Header;
