import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { authService } from '../services';

export { Header };

const Header = () => {

  const [user, setUser] = useState(false);

  useEffect(() => {
    const subscription = authService.user.subscribe((x: any) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    authService.logout();
  }

  // only show nav when logged in
  if (!user) return null;
  return (
    <header id='header'>
      <div className="header-row-1" >
        <div onClick={() => logout()}>Çıkış Yap</div>
      </div>

    </header>
  )
}

export default Header