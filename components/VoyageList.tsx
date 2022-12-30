import React, { useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const VoyageList = () => {
  const { voyageList } = useAppSelector((state: any) => state.expedition)
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [dateExpList, setDateExpList] = useState()
  return (<>
    <div className="card p-3 mt-3 mt-md-0">
      <div className="d-flex justify-content-between flex-wrap border-0">
        <div className="card-title">
          <h4 className="card-label p-0 m-0">Sefer Listesi</h4>
          <span className="text-muted"><small>Sisteme kayıtlı {voyageList?.length} sefer bulundu</small></span>
        </div>
        <div className="card-toolbar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Tarih"
              value={dateExpList}
              onChange={(newValue: any) => setDateExpList(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            {/* <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} /> */}
          </LocalizationProvider>
        </div>


      </div>

      <div className="form-group">

      </div>
      <ul className='w-100 p-0' style={{ listStyle: "none" }}>
        {
          voyageList.length > 0 ? voyageList.map((item: any) => {
            return <li className='text-capitalize p-2 row' key={item.id}><div className='content col-7'>{item.from}</div> <div className='d-inline col-5'>{item.to}</div></li>
          }) : ""
        }
      </ul>

    </div>
  </>
  )
}

export default VoyageList