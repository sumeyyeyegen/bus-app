import React, { useContext, useEffect, useRef, useState } from 'react'
import GraphBodyItem from './graph-body-item'

function GraphBody() {
  let type = 1;
  let seatNumber = 21;
  var height = 3;
  var width = 1;
  const [bigBoard, setBigBoard] = useState(new Array(width).fill(0).map(() => new Array(height).fill(0)));
  const [seats, setSeats] = useState<{ id: number, value: number, height: number, width: number }[]>([])
  const [emptyCoordinates, setEmptyCoordinates] = useState<{ row: number, col: number }>()
  const dataFetchedRef = useRef(false);

  function Control() {
    //ilk 0 değerine sahip row-col (coordinat) değerlri
    for (let row = 0; row < bigBoard.length; row++) {
      for (let col = 0; col < bigBoard[row].length; col++) {
        if (bigBoard[row][col] === 0) {
          return { row: row, col: col };
        }
      }
    }
  }

  function Revaluation(w: any, h: any, row: any, col: any) {
    for (let i = row; i < Number(row + h); i++) {
      for (let j = col; j < Number(col + w); j++) {
        let bashData = bigBoard;
        bashData[i][j] = 1

      }
    }
  }

  function ResetBigPlane() {
    for (let row = 0; row < bigBoard.length; row++) {
      for (let col = 0; col < bigBoard[row].length; col++) {
        if (bigBoard[row][col] === 1) {
          let bashData = bigBoard;
          bashData[row][col] = 0
          setBigBoard(bashData);
        }
      }
    }
  }

  function createSeatsList() {
    for (let i = 0; i < seatNumber; i++) {
      let bashData = seats;
      bashData.push({ id: i, value: i + 1, height: 3, width: 3 });
      console.log(bashData);

      setSeats(bashData);
    }
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    window.addEventListener("click", handler, true);
    window.addEventListener("click", textHandler, true);
    createSeatsList();
    let coor: any = Control();
    setEmptyCoordinates(coor);
  }, [])

  function KoltukYerlestirme(type: number, seatList: Array<{}>) {
    for (let i = 0; i < seatList.length; i++) {

      console.log(emptyCoordinates?.row)
      console.log(emptyCoordinates?.col);

    }
  }

  useEffect(() => {
    KoltukYerlestirme(type, seats)
  }, [type, seats])

  useEffect(() => {

    console.log(emptyCoordinates);

  }, [emptyCoordinates])

  // function createCoords(w: any, h: any, row: any, col: any) {
  //   let bashData = [];
  //   if (Number(col + w) <= bigBoard.length) {
  //     if (Number(row + h) <= bigBoard[col + w]) {
  //       return Revaluation(w, h, row, col);
  //     } else {
  //       return;
  //     }
  //   } else {
  //     return;
  //   }
  // }
  const svgRef = useRef<any>();
  const textRef = useRef<any>();

  const handler = () => {
    console.log(svgRef.current.getBoundingClientRect());

  };

  const textHandler = () => {
    console.log(textRef.current.getBoundingClientRect());
  }

  function Approve() {
    ResetBigPlane();
    Control()
  }
  return (
    <svg width="20em" height="30em" ref={svgRef} style={{
      // position: "absolute", zIndex: "-10"
    }} >
      <GraphBodyItem
        width="20em" height="30em"
        x={0}
        y={0}
        color="pink"
      />
      {
        bigBoard.map((row: any, index: any) => {
          return bigBoard[index]?.length > 0 && bigBoard[index]?.map((col: number, idx: number) => {
            return <a key={idx} href="javascript:void(0);">
              <use href="#seat" x={index} y={idx + 20} width="53" height="49"></use>
              <text x={index * 10} ref={textRef} y={idx * 50}> {bigBoard[index][idx]}</text>

            </a>
          })
        })
      }
    </svg >
  )
}

export default GraphBody