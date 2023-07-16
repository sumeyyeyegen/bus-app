import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';

const url = "http://localhost:83/api"

interface Values {
  plate_number: string,
  model_id: number | string,
  number_of_seats: number | string,
  type: number | string,
  properties: Array<any>
}

interface ValuesNewData {
  plate_number: string,
  bus_model_id: number,
  seats: number,
  type_id: number,
  properties: { id: number }[]
}

export const busService = {
  insertBus,
  updateBus
};

function insertBus(data: Values) {
  let newData: ValuesNewData = { plate_number: data.plate_number, bus_model_id: Number(data.model_id), seats: Number(data.number_of_seats), type_id: Number(data.type), properties: [] };
  for (let i = 0; i < data.properties.length; i++) {
    newData.properties.push({ id: data.properties[i] })
  }
  let token = Cookies.get("user-token");
  return fetchWrapper.post(`${url}/busses`, token, newData).then((res: any) => {
    return res;
  });
}

function updateBus(data: Values) {
  let newData: ValuesNewData = { plate_number: data.plate_number, bus_model_id: Number(data.model_id), seats: Number(data.number_of_seats), type_id: Number(data.type), properties: [] };
  for (let i = 0; i < data.properties.length; i++) {
    newData.properties.push({ id: data.properties[i] })
  }
  let token = Cookies.get("user-token");
  return fetchWrapper.put(`${url}/bus-definition`, token, newData).then((res: any) => {
    return res;
  });
}

