import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BuyTicketComponent from '../components/BuyTicket'
import SubHeader from '../components/SubHeader'
import { useAppDispatch } from '../redux/hooks'
import { setLocationList } from '../redux/reducers/ExpeditionReducer'
import styles from '../styles/BuyTicket.module.css'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // const { params, res } = context.query;
  // let { id } = context.query;
  let index = context.req.headers.cookie?.search("user-token");
  var authorization: string = "";
  index < 10 ? authorization = context.req.headers.cookie?.split(";")[0].split("=")[1] : authorization = context.req.headers.cookie?.split(";")[1].split("=")[1];

  const locationOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/locations",
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const locations: any = await axios(locationOptions).then((res: any) => res).catch(err => err)

  // const requestOptionById: Object = {
  //   method: 'GET',
  //   url: `http://localhost:83/api/model/${id}`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     "Authorization": authorization
  //   }
  // };

  // const responseById: any = await axios(requestOptionById).then((res: any) => res).catch(err => err)

  return {
    props: {
      locations: locations.data ? locations.data.data : []
      // modelList: responseById?.data?.model
    }
  }
}

const BuyTicket = ({ locations }: any) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("tab2")
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    let userToken = Cookies.get("user-token");
    setToken(userToken);
  }, []);

  useEffect(() => {
    dispatch(setLocationList(locations))
  }, [locations])


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
            activeTab === "tab2" && <BuyTicketComponent />
          }

        </div>
      </div>
    </div>
  )
}

export default BuyTicket