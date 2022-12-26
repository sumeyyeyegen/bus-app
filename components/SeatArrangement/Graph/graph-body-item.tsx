import React from 'react'

function GraphBodyItem(props: any) {
  const defaultProps = { multiplier: 20 };
  function prepareData() {
    // yukarıdan margin değeri 
    let d = [`M ${props.x}`];

    let collector: any = [0, 0]?.length && [0, 0]?.map((chunk: any) => {
      let xNext = Number(props.x) + Number(chunk[0]) * Number(defaultProps.multiplier);
      let yNext = Number(props.y) - Number(chunk[1]) * Number(defaultProps.multiplier);
      // height değerini ayarlıyor. y 
      return `L ${xNext} ${yNext}`;
    });

    return d.concat(collector).join(' ');
  }
  let d = prepareData();
  return (
    <rect x={props.x} y={props.y} width={props.width} height={props.height} fill="pink" />
  )
}

export default GraphBodyItem