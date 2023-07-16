import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BuyTicketComponent from '../components/BuyTicket/BuyTicket'
import FilterVoyage from '../components/BuyTicket/FilterVoyage'
import SubHeader from '../components/SubHeader'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setLocationList } from '../redux/reducers/VoyageReducer'
import styles from '../styles/BuyTicket.module.css'
import VoyageListComponent from '../components/VoyageList';
import VoyageInfoCard from '../components/BuyTicket/VoyageInfoCard'
import Graph from '../components/SeatArrangement/Graph/graph'
import { setSelectedVoyage } from '../redux/reducers/BuyTicketReducer'

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
  const { selectedVoyage, filteredVoyageList } = useAppSelector((state: any) => state.buyTicket)
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("tab2")
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    let userToken = Cookies.get("user-token");
    setToken(userToken);
    dispatch(setSelectedVoyage(""));
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
            activeTab === "tab2" && <div className='row m-0 w-100'>
              <div className="col-12 col-lg-5">

                <FilterVoyage />
                <VoyageListComponent handleClick={undefined} voyageList={filteredVoyageList} />

              </div>
              <div className='col-12 col-lg-7'>
                {selectedVoyage !== "" ? <div className="w-100 m-0 mt-3 mt-lg-0">
                  <VoyageInfoCard />
                  <BuyTicketComponent />
                </div>
                  : ""
                }
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default BuyTicket