import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../redux/hooks';

function Graph({ seatNumber }: any) {
  const { busInsertRes, selectedType } = useAppSelector((state: any) => state.bus)
  const [seats, setSeats] = useState<any[]>([])
  const createRef = useRef(false);

  function createSeatsList() {
    for (let i = 0; i < Number(seatNumber); i++) {
      let bashData = seats;
      bashData.push({ id: i, value: i + 1, height: 3, width: 3 });
      console.log(bashData);

      setSeats(bashData);
    }
  }

  useEffect(() => {
    console.log(seatNumber)
    if (createRef.current) return;
    else if (busInsertRes.message !== undefined && busInsertRes.message === "Bus created") {
      createSeatsList();
      createRef.current = true;
    }
  }, [seatNumber, busInsertRes, selectedType])

  function increment() {
    let data = seats;
    data.push({ id: seats.length, value: seats.length + 1, height: 3, width: 3 })
    setSeats([...data]);

  }
  function decrement() {
    let data = seats;
    data.pop();
    setSeats([...data]);
  }


  return (
    <div className="otobus-div koltuklar d-flex justify-content-end">
      <div className="px-5">
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
        <div className="row d-flex">
          {
            selectedType === 1 ? seats.length > 0 ? seats.map((item: any, idx: any) => {
              return <div className="col-4">
                <div className="koltuk" id="5" no="4" musait="1" rel="popover" title="">{item.id}</div>
              </div>
            }) : "" : selectedType === 2 && seats.length > 0 ? seats.map((item: any, idx: any) => {
              return <div className="col-3">
                <div className="koltuk" id="5" no="4" musait="1" rel="popover" title="">{item.id}</div>
              </div>
            }) : ""
          }
          {/* <div className="col ">
          <div className="koltuk ms-auto" id="5" no="4" musait="1" rel="popover" title="">1</div>
          <div className="koltuk ms-auto" id="5" no="4" musait="1" rel="popover" title="">4</div>
        </div>
        <div className="col">
          <div className="koltuk koltuk-beyaz" id="15" no="12" musait="1" rel="popover" title="">2</div>
          <div className="koltuk ms-auto" id="5" no="4" musait="1" rel="popover" title="">5</div>
        </div>
        <div className="col">
          <div className="koltuk koltuk-beyaz" id="20" no="16" musait="1" rel="popover" title="">3</div>
          <div className="koltuk ms-auto" id="5" no="4" musait="1" rel="popover" title="">6</div>
        </div> */}
        </div>
      </div>
    </div>
  )
}
export default Graph