import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';

const VoyageInfoCard = () => {
  const { selectedVoyage } = useAppSelector((state: any) => state.buyTicket)
  return (
    <div className="card w-100">
      <div className="card-body">
        <ListItem
          sx={{ display: "block" }}
          disableGutters>
          <div className={`d-flex justify-content-between align-items-center voyage-info info`}>
            <div className='voyage-info from-to'>
              <ListItemText className='voyage-info from' primary={selectedVoyage.from} />
              <ListItemText className='voyage-info to' primary={selectedVoyage.to} />
            </div>
            <div>
              <ListItemText className='voyage-info fee' primary={`${selectedVoyage.fee} ₺`} />
            </div>
          </div>
          <div className="d-block">
            <div className='ml-2'>
              <div className="d-flex justify-content-around">
                <div className="form-group full-seats">
                  <label htmlFor="" className='d-inline'>Dolu Koltuk : </label>
                  <ListItemText className='voyage-info seat full ml-1' primary={selectedVoyage.seatCount} />
                </div>
                <div className="form-group empty-seats">
                  <label htmlFor="">Boş Koltuk : </label>
                  <ListItemText className='voyage-info seat empty ml-1' primary={selectedVoyage.seatCount} />
                </div>
                <div className="form-group remaining-time">
                  <label htmlFor="">Sefere Kalan Süre : </label>
                  <ListItemText className='voyage-info seat time ml-1' primary={selectedVoyage.seatCount} />
                </div>
              </div>
            </div>
          </div>
        </ListItem>
      </div>
    </div>
  )
}

export default VoyageInfoCard