import React, { useEffect, useRef, useState } from 'react'
import { isTemplateExpression } from 'typescript';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSeats } from '../../../redux/reducers/BusReducer';
import { setClickList, setSelectedSeat } from '../../../redux/reducers/BuyTicketReducer';
import Seat1 from './Seat1';

function Graph({ seatNumber }: any) {
  const { busInsertRes, selectedType, seats, edit } = useAppSelector((state: any) => state.bus)
  const { selectedVoyage, clickList, selectedSeat } = useAppSelector((state: any) => state.buyTicket)
  const createRef = useRef(false);


  const dispatch: any = useAppDispatch();

  function createSeatsList() {
    let bashData = [];
    for (let i = 0; i < Number(seatNumber); i++) {
      //free:0 boş free:1 erkek free:2 kadın
      bashData.push({ id: i, value: i + 1, height: 3, width: 3, free: 0 });
    }

    dispatch(setSeats([...bashData]));
  }

  useEffect(() => {
    edit ? createSeatsList() : createSeatsList()
  }, [seatNumber, busInsertRes, selectedType])

  function hesaplaLeft(idx: number) {
    let bolum = Math.floor((idx + 1) / 3);
    let kalan = (idx + 1) % 3;
    if (bolum === 0) {
      if (kalan === 1) {
        return 47 * 0;
      }
      else if (kalan === 2) {
        return 47 * 2;
      }
      else if (kalan === 0) {
        return 47 * 3;
      }

    }
    else if (bolum > 0) {
      if (kalan === 1) {
        return 47 * 0;
      }
      else if (kalan === 2) {
        return 47 * 2;
      }
      else if (kalan === 0) {
        return 47 * 3;
      }

    }
  }

  function hesaplaTop(idx: number) {
    let bolum = Math.floor((idx + 1) / 3);
    let kalan = (idx + 1) % 3;
    if (bolum > 0 && kalan > 0) {
      return 47 * bolum;
    } else if (bolum === 0 && kalan > 0) {
      return 0;
    } else if (bolum > 0 && kalan === 0) {
      return 47 * (bolum - 1);
    }
  }

  function hesaplaLeftForSelectType2(idx: number) {
    let bolum = Math.floor((idx + 1) / 4);
    let kalan = (idx + 1) % 4;
    if (bolum === 0) {
      if (kalan === 1) {
        return 47 * 0;
      }
      else if (kalan === 2) {
        return 47 * 1;
      }
      else if (kalan === 3) {
        return 47 * 3;
      }
      else if (kalan === 0) {
        return 47 * 4;
      }
    }
    else if (bolum > 0) {
      if (kalan === 1) {
        return 47 * 0;
      }
      else if (kalan === 2) {
        return 47 * 1;
      }
      else if (kalan === 3) {
        return 47 * 3;
      }
      else if (kalan === 0) {
        return 47 * 4;
      }
    }
    // return 5
  }

  function hesaplaTopForSelectType2(idx: number) {
    let bolum = Math.floor((idx + 1) / 4);
    let kalan = (idx + 1) % 4;
    if (bolum > 0 && kalan > 0) {
      return 47 * bolum;
    } else if (bolum === 0 && kalan > 0) {
      return 0;
    } else if (bolum > 0 && kalan === 0) {
      return 47 * (bolum - 1);
    }
  }

  function createClickList() {
    let createList = seats.map((item: any) => { return { id: item.id, clicked: false, gender: 0 } })
    console.log(createList);
    dispatch(setClickList([...createList]));

  }

  useEffect(() => {
    createClickList();
  }, [])

  function test() {
    let seatList = selectedVoyage.seats[0].seat_properties;
    console.log(seatList);
    for (let i = 0; i < clickList.length; i++) {
      for (let j = 0; j < seatList.length; j++) {
        if (Number(clickList[i].id + 1) === Number(seatList[j].no)) {
          if (seatList[j].gender === true) {
            console.log("test", seatList[j].gender);

            return { id: clickList[i].id, clicked: clickList[i].clicked, gender: true }
          } else {
            console.log("test1", seatList[j].gender);
            return { id: clickList[i].id, clicked: clickList[i].clicked, gender: false }
          }
        } else {
          console.log("test2", seatList[j].gender);
          return { id: clickList[i].id, clicked: clickList[i].clicked, gender: 0 }
        }
      }
    }

  }
  const [nextArr, setNextArr] = useState<any[]>([])
  useEffect(() => {
    let bashData = nextArr;
    let data: any = "";
    data = test();
    bashData.push(data);
    console.log(bashData);


  }, [clickList, selectedSeat])

  useEffect(() => {
    console.log(clickList);
    console.log(selectedSeat);

  }, [clickList, selectedSeat])

  useEffect(() => {
    createClickList();
  }, [selectedVoyage])

  function handleClick(id: any) {

    let nextClickList = clickList.map((item: any) => item.id === id ? ({ id: id, clicked: !item.clicked, gender: item.gender }) : item);
    dispatch(setClickList([...nextClickList]));
    dispatch(setSelectedSeat(id + 1));
  }

  return (
    <div className="bus seats d-flex justify-content-center mt-3 mt-lg-0" style={{ margin: "0 auto", flexWrap: "wrap" }}>
      {
        selectedType === 1 ? seats.length > 0 ? seats.map((item: any, idx: any) => {
          return <Seat1 clickList={clickList} handleClick={handleClick} hesaplaLeft={hesaplaLeft} hesaplaTop={hesaplaTop} key={idx} idx={idx} id={item.id} selected={item.selected} selectedType={selectedType} />
        }) : "" : selectedType === 2 && seats.length > 0 ? seats.map((item: any, idx: any) => {
          return <Seat1 clickList={clickList} handleClick={handleClick} hesaplaLeft={hesaplaLeftForSelectType2} hesaplaTop={hesaplaTopForSelectType2} selected={item.selected} key={idx} idx={idx} id={item.id} selectedType={selectedType} />
        }) : selectedType === "" ? selectedVoyage.type === "2+2" ? seats.length > 0 && seats.map((item: any, idx: any) => {
          return <Seat1 clickList={clickList} handleClick={handleClick} hesaplaLeft={hesaplaLeftForSelectType2} hesaplaTop={hesaplaTopForSelectType2} selected={item.selected} key={idx} idx={idx} id={item.id} selectedType="2" />
        }) : selectedVoyage.type === "2+1" && seats.length > 0 && seats.map((item: any, idx: any) => {
          return <Seat1 clickList={clickList} handleClick={handleClick} selected={item.selected} hesaplaLeft={hesaplaLeft} hesaplaTop={hesaplaTop} key={idx} idx={idx} id={item.id} selectedType="1" />
        }) : ""
      }
    </div>
  )
}
export default Graph