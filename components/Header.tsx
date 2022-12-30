import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { authService } from '../services';
import Cookies from 'js-cookie';

export { Header };

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    let userToken = Cookies.get("user-token");
    setToken(userToken);
    const subscription = authService.user.subscribe((x: any) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    authService.logout();
  }

  // only show nav when logged in
  if (!user && router.asPath !== "/buy-ticket" && router.asPath !== "/login") return null;

  return (
    <header id='header'>
      <div className="header-row-1" >
        {
          user && token !== undefined ?
            router.asPath === "/" ?
              <div className='d-flex justify-content-end w-100'><div onClick={() => logout()}>Çıkış Yap</div></div> : router.asPath === "/buy-ticket" && <div className='d-flex justify-content-end w-100'><Link href={`${"/login"}`}>Çıkış Yap</Link></div>
            : router.asPath === "/buy-ticket" ? <div className='d-flex justify-content-end w-100'><Link href={`${"/login"}`}>Giriş Yap</Link></div>
              : router.asPath === "/login" && <div className='d-flex justify-content-end w-100'><Link href={`${"/buy-ticket"}`}>Bilet Al</Link></div>
        }

      </div>

    </header>
  )
}

export default Header