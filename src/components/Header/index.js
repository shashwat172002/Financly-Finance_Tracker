import React, { useEffect } from 'react'
import "./styles.css"
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  function logoutFnc() {
    auth.signOut();
    navigate("/");
  }

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
      <p className='logo link' onClick={logoutFnc}>
      Logout
    </p>
    )}
    
    </div>
  )
}

export default Header;
