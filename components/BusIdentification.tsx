import React from 'react'

import { useAppSelector } from '../redux/hooks';

import InsertForm from './InsertForm';
import UpdateForm from './UpdateForm';

const BusIdentification = () => {

  const { edit } = useAppSelector((state: any) => state.bus)

  return (
    edit ? <UpdateForm /> : <InsertForm />
  )
}

export default BusIdentification