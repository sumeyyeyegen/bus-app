import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BuyTicketComponent from '../components/BuyTicket'
import SubHeader from '../components/SubHeader'
import styles from '../styles/BuyTicket.module.css'

const BuyTicket = () => {
  const [activeTab, setActiveTab] = useState("tab2")
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    let userToken = Cookies.get("user-token");
    setToken(userToken);
  }, []);


  return (
    <div className={styles.container}>
      <header id="header">
        <div className="header-row-2">
          <div className="categories container mb-3">
            <ul className='menu left'>
              {
                token !== undefined ? <li className={`bus-identification sub-header-item ${activeTab === "tab1" && "active"}`} value="tab1" onClick={() => router.push("/")}>Ana Sayfa</li> : ""
              }

              <li className={`buy-ticket sub-header-item ${activeTab === "tab2" && "active"}`} >Bilet Al</li>
            </ul>
          </div>
        </div>
      </header>
      <div className="card">
        <div className="card-body">
          {
            activeTab === "tab3" && <BuyTicketComponent />
          }

        </div>
      </div>
    </div>
  )
}

export default BuyTicket