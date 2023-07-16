
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, FC } from 'react';
import BusIdentification from '../components/BusIdentification';
import VoyageDef from '../components/VoyageDef';
import SubHeader from '../components/SubHeader';
import { fetchWrapper } from '../helpers';
import { useAppDispatch } from '../redux/hooks';
import { setBrandList, setModelList, setPropList, setTypeList } from '../redux/reducers/BusReducer';
import { setLocationList, setVoyageList } from '../redux/reducers/VoyageReducer';

import { authService } from '../services';
import styles from '../styles/Home.module.css'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // const { params, res } = context.query;
  // let { id } = context.query;
  let index = context.req.headers.cookie?.search("user-token");
  var authorization: string = "";
  index < 10 ? authorization = context.req.headers.cookie?.split(";")[0].split("=")[1] : authorization = context.req.headers.cookie?.split(";")[1].split("=")[1];


  // const authorization = Cookies.get("token");
  const brandOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/brands",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const propOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/properties",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const typeOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/types",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const busOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/busses",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const locationOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/locations",
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const voyageOptions: Object = {
    method: 'GET',
    url: "http://localhost:83/api/voyage",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const locations: any = await axios(locationOptions).then((res: any) => res).catch(err => err)
  const allBus: any = await axios(busOptions).then((res: any) => res).catch(err => err)
  const brands: any = await axios(brandOptions).then((res: any) => res).catch(err => err)
  const properties: any = await axios(propOptions).then((res: any) => res).catch(err => err)
  const types: any = await axios(typeOptions).then((res: any) => res).catch(err => err)
  const voyages: any = await axios(voyageOptions).then((res: any) => res).catch(err => err)

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
      // token: authorization,
      // token1: authorization
      allBrands: brands?.data ? brands?.data.data : [],
      allProps: properties.data ? properties.data.data : [],
      allTypes: types.data ? types.data.data : [],
      busList: allBus.data ? allBus.data.data : [],
      locations: locations.data ? locations.data.data : [],
      voyageList: voyages.data ? voyages.data.data : []
      // modelList: responseById?.data?.model
    }
  }
}

const Home: FC<any> = ({ allBrands, allProps, allTypes, busList, locations, voyageList }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tab1")

  useEffect(() => {
    let control = authService.userValue.getValue();
    let token = Cookies.get("user-token");
    if (control === false || control === null || token === null || token === undefined || token === "") {
      router.push('/buy-ticket');
    }
  }, [])

  useEffect(() => {
    dispatch(setBrandList(allBrands))
    dispatch(setPropList(allProps))
    dispatch(setTypeList(allTypes))
    dispatch(setLocationList(locations))
    dispatch(setVoyageList(voyageList))
    // dispatch(setModelList(modelList))

  }, [allBrands, allProps, allTypes, locations, voyageList])

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <div className={styles.container}>
      <SubHeader handleTab={handleTab} activeTab={activeTab} />
      <div className="card">
        <div className="card-body">
          {
            activeTab === "tab1" ? <BusIdentification /> : activeTab === "tab2" && <VoyageDef busList={busList} />
          }

        </div>
      </div>
    </div>
  )
}

export default Home