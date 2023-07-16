import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';

const url = "http://localhost:83/api"


interface Values {
  from: string,
  to: string,
  day: string | undefined,
  time: string | undefined
}

interface InsertValues {
  travel_id: number,
  bus_id: number,
  gender: boolean,
  no: number
}

export const buyTicketService = {
  filter,
  buyTicket
};

function filter(data: Values) {
  return fetchWrapper.get(`${url}/voyage/${data.from}-${data.to}/day:${data.day}-time:${data.time}`, undefined).then(res => {
    return res;
  })
}

function buyTicket(data: InsertValues) {
  let token = Cookies.get("user-token");
  return fetchWrapper.post(`${url}/voyage/buy-ticket`, token, data).then(res => {
    return res;
  })
}
