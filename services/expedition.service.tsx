import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';
import { Dayjs } from 'dayjs';

const url = "http://localhost:82/api"

interface Values {
  bus: Object,
  fee: number | string,
  from: number | string,
  to: number | string,
  date: Dayjs | null
}

export const expeditionService = {
  insertExpedition,
  deleteExpedition
};

function insertExpedition(data: Values) {
  let newData: Values = { bus: data.bus, fee: Number(data.fee), from: Number(data.from), to: Number(data.to), date: data.date };

  let token = Cookies.get("user-token");
  return fetchWrapper.post(`${url}/voyage`, token, newData).then((res: any) => {
    console.log(res);
    return res;
  });
}

function deleteExpedition() {

}

