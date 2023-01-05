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
      {/* <ul className='w-100 p-0' style={{ listStyle: "none" }}>
        {
          voyageList.length > 0 ? voyageList.map((item: any) => {
            return <li className='text-capitalize p-2 row' key={item.id}><div className='content col-7'>{item.from}</div> <div className='d-inline col-5'>{item.to}</div></li>
          }) : ""
        }
      </ul> */}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#DAF7A6', minWidth: "100%" }}>
        {voyageList.length > 0 ? voyageList.map((item: any) => (
          item?.buses?.map((bus: any, idx: any) => {
            return <VoyageListItem seatCount={bus?.seats[0]?.count} id={bus.id} handleClick={handleClick} from={item.from} to={item.to} day={item.day} fee={item.fee} type={bus.type} key={idx} />
          })
        )) : "Sefer Bulunamadı"}
      </List>

    </div>
  </>
  )
}

export default VoyageList