import { useRouter } from 'next/router';
import React from 'react'
import { authService } from '../services';
interface PropTypes {
  handleTab: Function,
  activeTab: string
}
const SubHeader = ({ handleTab, activeTab }: PropTypes) => {
  const router = useRouter();
  const control = authService.userValue.getValue();

  // if (control !== false && control !== null) {
  //   router.push('/');
  // }

  console.log(router.asPath)
  return (
    <header id="header">
      <div className="header-row-2">
        <div className="categories container mb-3">
          <ul className='menu left'>
            {
              control !== false && control !== null ? <> <li className={`bus-identification sub-header-item ${activeTab === "tab1" && "active"}`} value="tab1" onClick={() => handleTab("tab1")}>Otobüs Tanımlama</li>
                <li className={`exp-definition sub-header-item ${activeTab === "tab2" && "active"}`} value="tab2" onClick={() => handleTab("tab2")}>Sefer Tanımlama</li>
                <li className={`buy-ticket sub-header-item ${activeTab === "tab3" && "active"}`} value="tab3" onClick={() => router.push("/buy-ticket")}>Bilet Al</li></> :
                <>
                  {/* <li className={`bus-identification sub-header-item ${activeTab === "tab1" && "active"}`} value="tab1" onClick={() => router.push("/")}>Ana Sayfa</li> */}
                  <li className='buy-ticket' value="tab3" onClick={() => router.push("/buy-ticket")}>Bilet Al</li>
                </>
            }

          </ul>
        </div>
      </div>
    </header>
  )
}

export default SubHeader