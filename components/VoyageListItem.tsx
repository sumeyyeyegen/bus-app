import React from 'react'
import { ListItem, ListItemText, TextField } from '@mui/material';
import { setSelectedVoyage } from '../redux/reducers/BuyTicketReducer';
import { useAppDispatch } from '../redux/hooks';

interface Values {
  from: string,
  to: string,
  type: string,
  fee: string,
  day: string,
  handleClick: Function | undefined,
  id: any,
  seatCount: number,
  voyageId: number,
  seats: Array<any>
}

const VoyageListItem = ({ from, to, type, fee, day, handleClick, id, seatCount, voyageId, seats }: Values) => {
  const dispatch = useAppDispatch();

  return (
    <><ListItem
      sx={{ display: "block" }}
      disableGutters
      onClick={() => handleClick !== undefined ? handleClick({ id: id, from: from, to: to, type: type, fee: fee, day: day, seatCount: seatCount }) : dispatch(setSelectedVoyage(JSON.parse(JSON.stringify({ id: id, from: from, to: to, type: type, fee: fee, day: day, seatCount: seatCount, voyageId: voyageId,seats:seats }))))}
    >
      <div className={`d-flex justify-content-start align-items-center voyage-info ${handleClick !== undefined ? "allVoyageList" : "filteredVoyageList"}`}>
        <ListItemText className='voyage-info from' primary={from} />
        <ListItemText className='voyage-info to' sx={{ textTransform: "capitalize" }} primary={to} />
      </div>
      <div className="d-block">
        <div className='d-flex align-items-center' style={{ marginLeft: "1.5em" }}>
          <ListItemText className='voyage-info seat' primary={type} />
          <ListItemText className='voyage-info fee' primary={`${fee} ₺`} />
          <ListItemText className='voyage-info date' primary={day?.slice(0, 10).split("-").reverse().join("/")} />
          <ListItemText className='voyage-info time' primary={day?.slice(12, 16)} />
        </div>
      </div>
    </ListItem></>
  )
}

export default VoyageListItem