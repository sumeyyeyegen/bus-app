
import axios from 'axios';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import BusIdentification from '../components/BusIdentification';
import ExpeditionDef from '../components/ExpeditionDef';
import { fetchWrapper } from '../helpers';
import { setBrandList, setModelList, setPropList, setTypeList } from '../redux/reducers/BusReducer';

import { authService } from '../services';
import styles from '../styles/Home.module.css'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // const { params, res } = context.query;
  // let { id } = context.query;
  let index = context.req.headers.cookie?.search("user-token");
  var authorization: string = "";
  index < 10 ? authorization = context.req.headers.cookie?.split(";")[0].split("=")[1] : authorization = context.req.headers.cookie?.split(";")[1].split("=")[1];


  // const authorization = Cookies.get("token");
  const requestOptions: Object = {
    method: 'GET',
    url: "http://localhost:82/api/bus-definition",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const response: any = await axios(requestOptions).then((res: any) => res).catch(err => err)

  // const requestOptionById: Object = {
  //   method: 'GET',
  //   url: `http://localhost:82/api/model/${id}`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     "Authorization": authorization
  //   }
  // };

  // const responseById: any = await axios(requestOptionById).then((res: any) => res).catch(err => err)

  return {
    props: {
      // token: authorization,
      // token1: authorization
      allBrands: response.data.brand,
      allProps: response.data.properties,
      allTypes: response.data.types,
      // modelList: responseById?.data?.model
    }
  }
}

const Home: FC<any> = ({ allBrands, allProps, allTypes }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tab1")

  useEffect(() => {
    let control = authService.userValue.getValue();
    let token = Cookies.get("user-token");
    if (control === false || control === null || token === null || token === undefined || token === "") {
      router.push('/login');
    }
  }, [])

  useEffect(() => {
    dispatch(setBrandList(allBrands))
    dispatch(setPropList(allProps))
    dispatch(setTypeList(allTypes))
    // dispatch(setModelList(modelList))

  }, [allBrands, allProps, allTypes])

  return (
    <div className={styles.container}>
      <header id="header">
        <div className="header-row-2">
          <div className="categories container mb-3">
            <ul className='menu left'>
              <li className='bus-identification' value="tab1" onClick={() => setActiveTab("tab1")}>Otobüs Tanımlama</li>
              <li className='exp-definition' value="tab2" onClick={() => setActiveTab("tab2")}>Sefer Tanımlama</li>
              <li className='buy-ticket' value="tab3" onClick={() => setActiveTab("tab3")}>Bilet Al</li>
            </ul>
          </div>
        </div>
      </header>
      <div className="card">
        <div className="card-body">
          {
            activeTab === "tab1" ? <BusIdentification /> : activeTab === "tab2" ? <ExpeditionDef /> : ""
          }

        </div>
      </div>
    </div>
  )
}

export default Home