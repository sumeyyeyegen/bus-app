import { ListItemText } from '@mui/material'
import React, { useState } from 'react'
import Alert from '../../helpers/Alert'
import { useAppSelector } from '../../redux/hooks'
import { buyTicketService } from '../../services'

const TicketInfo = () => {
  const { selectedVoyage, selectedSeat } = useAppSelector((state: any) => state.buyTicket)
  const [selectedGender, setSelectedGender] = useState(true)

  const buyTicket = () => {
    console.log(selectedVoyage);

    buyTicketService.buyTicket({ travel_id: selectedVoyage.voyageId, bus_id: selectedVoyage.id, gender: selectedGender, no: selectedSeat }).then(res => {
      res.data.message==="Bilet satın alımı başarılı" ? Alert().Success("Bilet alma işlemi başarılı"):""

    }).catch(err => {
      err.response.data.message==="Bu koltuk daha önceden satılmıştır" ? Alert().Error("Bu koltuk satılı"):""

    })
  }

  return (
    <div className="card buy-ticket-user-info">
      <div className="card-body">
        <div className="form-group seat-number">
          <label htmlFor="" className='d-inline'>Koltuk Numarası : </label>
          <ListItemText className='voyage-info seat ml-1 d-inline' primary={selectedSeat} />
        </div>
        <div className="form-group seat-number">
          <label htmlFor="" className='d-inline'>Koltuk Ücreti : </label>
          <ListItemText className='voyage-info seat ml-1 d-inline' primary={`${selectedVoyage.fee} ₺`} />
        </div>
        <div className="form-group gender">
          <label htmlFor="" className='d-inline gender'>Cinsiyet : </label>
          <button className={`btn btn-sm woman ${selectedGender ? "active" : ""}`} onClick={() => setSelectedGender(true)}>Kadın</button>
          <button className={`man btn btn-sm ${selectedGender ? "" : "active"}`} onClick={() => setSelectedGender(false)}>Erkek</button>
        </div>
        <div className="form-group">
          <button className={`btn btn-sm buy-ticket-button`} onClick={() => buyTicket()}>Satın Al</button>
        </div>
      </div>
    </div>
  )
}

export default TicketInfo