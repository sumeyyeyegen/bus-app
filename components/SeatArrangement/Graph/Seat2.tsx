import React from 'react'

interface PropValues {
  idx: any,
  id: number
}

function Seat2({ idx, id }: PropValues) {
  return (
    <div className="koltuk" id={idx} title="">{id}</div>
  )
}

export default Seat2