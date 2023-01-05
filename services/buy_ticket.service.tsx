import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';

const url = "http://localhost:83/api"


interface Values {
  from: string,
  to: string,
  day: string|undefined,
  time: string|undefined
}

export const buyTicketService = {
  filter
};

function filter(data: Values) {
  return fetchWrapper.get(`${url}/voyage/${data.from}-${data.to}/day:${data.day}-time:${data.time}`, undefined).then(res => {
    return res;
  })
}

