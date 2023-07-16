import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';
import { Dayjs } from 'dayjs';

const url = "http://localhost:83/api"

interface Values {
  bus_id: number | string,
  fee: number | string,
  from: string | string,
  to: string | string,
  date: string | null
}

export const voyageService = {
  insertVoyage,
  deleteVoyage,
  getVoyageByParams
};

function insertVoyage(data: Values) {
  let newData: Values = { bus_id: data.bus_id, fee: Number(data.fee), from: data.from, to: data.to, date: data.date };

  let token = Cookies.get("user-token");
  return fetchWrapper.post(`${url}/voyage`, token, newData).then((res: any) => {
    return res;
  });
}

function getVoyageByParams(from: string, to: string, day: string, time: string) {
  let token = Cookies.get("user-token");
  return fetchWrapper.get(`${url}/voyage/${from}-${to}/day:${day}-time:${time}`, token).then((res: any) => {
    return res;
  });
}

function deleteVoyage(id: any) {
  let token = Cookies.get("user-token");
  return fetchWrapper.delete(`${url}/voyage/${id}`, token, { id: id }).then((res: any) => {
    return res;
  });
}

