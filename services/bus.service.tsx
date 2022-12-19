import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';

const url = "http://localhost:82/api"

interface Values {
  plate_number: string,
  model_id: number | string,
  number_of_seats: number | string,
  type: number | string,
  properties: Array<any>
}

interface ValuesNewData {
  plate_number: string,
  model_id: number,
  number_of_seats: number,
  type: number,
  properties: { id: number }[]
}

export const busService = {
  insertBus
};

function insertBus(data: Values) {
  let newData: ValuesNewData = { plate_number: data.plate_number, model_id: Number(data.model_id), number_of_seats: Number(data.number_of_seats), type: Number(data.type), properties: [] };
  for (let i = 0; i < data.properties.length; i++) {
    newData.properties.push({ id: data.properties[i] })
  }
  console.log(newData)
  let token = Cookies.get("user-token");
  return fetchWrapper.post(`${url}/bus`, token, newData).then((res: any) => {
    console.log(res);
    return res;
  });
}

// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }
