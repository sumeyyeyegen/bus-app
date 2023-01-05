import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { buyTicketService } from '../services/buy_ticket.service';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Graph from './SeatArrangement/Graph/graph';
import VoyageListComponent from './VoyageList';
import { setSelectedVoyage } from '../redux/reducers/BuyTicketReducer';

interface Values {
  from: string,
  to: string,
  day: string | undefined,
  time: string | undefined
}

const BuyTicketComponent = () => {
  const dispatch: any = useAppDispatch();
  const { selectedVoyage } = useAppSelector((state: any) => state.buyTicket)
  const [fromProvince, setFromProvince] = useState("");
  const [toProvince, setToProvince] = useState<string | undefined>("");
  const [filteredLocationList, setFilteredLocationList] = useState<any[]>([])
  const [voyageList, setVoyageList] = useState<any>([])
  const { locationList } = useAppSelector((state: any) => state.expedition)
  const validationSchema = Yup.object().shape({
    from: Yup.string()
      .required("Başlangıç noktası seçiniz"),
    to: Yup.string()
      .required("Varış noktası seçiniz")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);

  function onSubmit(data: Values) {
    let dat = {
      from: data.from, to: data.to, day: undefined, time: undefined
    };
    return buyTicketService.filter(dat)
      .then((res: any) => {
        setVoyageList(res.data.data)
      })
      .catch((error: any) => {
        // setError('apiError', { message: error.message });
      });
  }

  useEffect(() => {
    dispatch(setSelectedVoyage(""));
  }, [])

  useEffect(() => {
    let filteredData = locationList.filter((item: any) => item.name !== fromProvince)
    setFilteredLocationList([...filteredData]);
  }, [fromProvince])

  return (
    <Formik
      initialValues={{ from: "", to: "", day: "", time: "" }}
      onSubmit={(values: Values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {formik => {
        const { touched, isValid, values, handleChange, handleSubmit } = formik
        return (<div className='row w-100'>
          <div className="col-12 col-lg-6">
            <Form className='d-sm-flex'>
              <div className="form-group w-100">
                <FormControl fullWidth className='p-0'>
                  <InputLabel id="demo-simple-select-label">Nereden</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required={true}
                    value={fromProvince}
                    label="Nereden"
                    {...register("from")}
                    onChange={(e) => (handleChange(e), setFromProvince(e.target.value))}
                  >
                    {
                      locationList.length > 0 ? locationList.map((province: any) => {
                        return <MenuItem key={province.id} value={province.name}>{province.name}</MenuItem>
                      }) : ""
                    }

                  </Select>
                </FormControl>
              </div>
              <div className="form-group w-100 ml-sm-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Nereye</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required={true}
                    value={toProvince}
                    label="Nereye"
                    {...register("to")}
                    onChange={(e) => (handleChange(e), setToProvince(e.target.value))}
                  >
                    {
                      filteredLocationList.length > 0 ? filteredLocationList.map((province: any) => {
                        return <MenuItem key={province.id} value={province.name}>{province.name}</MenuItem>
                      }) : ""
                    }

                  </Select>
                </FormControl>
              </div>
              <div className="form-group mb-0 w-50 ml-sm-2 text-end">
                <button
                  disabled={formState.isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-sm py-3 px-4">
                  {formState.isSubmitting &&
                    <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Filtrele
                </button>
              </div>
            </Form>

            <VoyageListComponent handleClick={undefined} voyageList={voyageList} />

          </div>
          <div className='col-12 col-md-6 d-flex justify-content-center'>
            <Graph seatNumber={selectedVoyage.seatCount !== undefined ? selectedVoyage.seatCount : "21"} />
          </div>
        </div>
        )
      }
      }
    </Formik>
  )
}

export default BuyTicketComponent