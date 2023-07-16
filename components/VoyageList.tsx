import React from 'react'
import { List } from '@mui/material';
import VoyageListItem from './VoyageListItem';

interface Values {
  voyageList: Array<any>,
  handleClick: Function | undefined
}
const VoyageList = ({ voyageList, handleClick }: Values) => {
  return (<>
    <div className="card p-3 mt-3 mt-md-0">
      <div className="d-flex justify-content-between flex-wrap border-0">
        <div className="card-title">
          <h4 className="card-label p-0 m-0">Sefer Listesi</h4>
          <span className="text-muted"><small>Sisteme kayıtlı {voyageList?.length} sefer bulundu</small></span>
        </div>
      </div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#DAF7A6', minWidth: "100%" }}>
        {voyageList.length > 0 ? voyageList.map((item: any) => (
          console.log(item),
          item?.buses?.map((bus: any, idx: any) => {
            return <VoyageListItem seatCount={bus?.seats[0]?.count} voyageId={item.id} id={bus.id} handleClick={handleClick} from={item.from} to={item.to} day={item.day} fee={item.fee} type={bus.type} key={idx} seats={bus.seats} />
          })
        )) : "Sefer Bulunamadı"}
      </List>

    </div>
  </>
  )
}

export default VoyageList