import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'
import useModal from '../helpers/hooks/useModal';
import { useAppSelector } from '../redux/hooks';
import Modal from './Modal';
import VoyageList from './VoyageList';

const VoyageDefList = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [dateExpList, setDateExpList] = useState()
  const { voyageList } = useAppSelector((state: any) => state.voyage)
  const [modalInfo, setModalInfo] = useState("")
  const { isShowing, toggle } = useModal();

  const handleClick = (info: any) => {
    setModalInfo(info);
    toggle();
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          className='mb-3'
          label="Tarih"
          value={dateExpList}
          onChange={(newValue: any) => setDateExpList(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        {/* <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} /> */}
      </LocalizationProvider>
      <VoyageList handleClick={handleClick} voyageList={voyageList} />


      {
        isShowing ? <Modal
          hide={toggle} modalInfo={modalInfo} /> : null
      }

    </>
  )
}

export default VoyageDefList