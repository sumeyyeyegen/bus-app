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
  seatCount: number
}

const VoyageListItem = ({ from, to, type, fee, day, handleClick, id, seatCount }: Values) => {
  const dispatch = useAppDispatch();

  return (
    <><ListItem
      disableGutters
      onClick={() => handleClick !== undefined ? handleClick({ id: id, from: from, to: to, type: type, fee: fee, day: day, seatCount: seatCount }) : dispatch(setSelectedVoyage({ id: id, from: from, to: to, type: type, fee: fee, day: day, seatCount: seatCount }))}
    >
      <ListItemText sx={{ textTransform: "capitalize", padding: "1em" }} primary={from} />
      <ListItemText sx={{ textTransform: "capitalize" }} primary={to} />
      <ListItemText sx={{ textTransform: "capitalize" }} primary={type} />
      <ListItemText sx={{ textTransform: "capitalize" }} primary={fee} />
      <ListItemText sx={{ textTransform: "capitalize" }} primary={day?.slice(0, 10)} />
      <ListItemText sx={{ textTransform: "capitalize" }} primary={day?.slice(12, 16)} />
    </ListItem></>
  )
}

export default VoyageListItem