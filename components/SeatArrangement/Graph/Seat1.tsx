import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { setSeats } from '../../../redux/reducers/BusReducer'


interface PropValues {
  idx: any,
  id: number,
  selectedType: string | number | undefined,
  hesaplaTop: Function,
  hesaplaLeft: Function,
  selected: boolean,
  handleClick: Function,
  clickList: Array<{ id: number, clicked: boolean }>
}
function Seat1({ idx, id, selectedType, hesaplaLeft, hesaplaTop, handleClick, selected, clickList }: PropValues) {
  const { seats } = useAppSelector((state: any) => state.bus)
  const dispatch = useAppDispatch();

  return (
    <div className={`selectedType${selectedType} koltuk${idx + 1}  ${clickList?.length > 0 && clickList[idx]?.clicked === true ? "selected" : ""}`} onClick={() => handleClick(idx)} style={{ left: hesaplaLeft(idx), top: hesaplaTop(idx) }} id={idx} title="">{id + 1}</div>
  )
}

export default Seat1