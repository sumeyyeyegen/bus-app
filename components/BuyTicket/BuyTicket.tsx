import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Graph from '../SeatArrangement/Graph/graph';

import { setSelectedVoyage } from '../../redux/reducers/BuyTicketReducer';
import TicketInfo from './TicketInfo';

const BuyTicketComponent = () => {
  const { selectedVoyage, selectedSeat } = useAppSelector((state: any) => state.buyTicket)
  const dispatch: any = useAppDispatch();

  return (
    <div className='row mx-0 mt-3 w-100'>
      <div className="col-12 col-lg-6 order-2 order-lg-1 pl-0 pr-0 pr-lg-2">
        <Graph seatNumber={selectedVoyage.seatCount !== undefined ? selectedVoyage.seatCount : "21"} />
      </div>
      <div className="col-12 col-lg-6 order-1 order-lg-2 pr-0 pl-0 pl-lg-2">
        {
          selectedVoyage !== "" && selectedSeat !== "" ?
            <TicketInfo /> : ""
        }
      </div>

    </div>

  )
}

export default BuyTicketComponent