import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select } from '@mui/material';
import { setFilteredVoyageList, setFilterError, setSelectedVoyage } from '../../redux/reducers/BuyTicketReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { buyTicketService } from '../../services/buy_ticket.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

interface Values {
  from: string,
  to: string,
  day: string | undefined,
  time: string | undefined
}


const FilterVoyage = () => {

  const { locationList } = useAppSelector((state: any) => state.voyage)
  const [filteredLocationList, setFilteredLocationList] = useState<any[]>([])
  const [fromProvince, setFromProvince] = useState("");
  const [toProvince, setToProvince] = useState<string | undefined>("");
  const dispatch: any = useAppDispatch();
  const validationSchema = Yup.object().shape({
    from: Yup.string()
      .required("Başlangıç noktası seçiniz"),
    to: Yup.string()
      .required("Varış noktası seçiniz")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    dispatch(setFilteredVoyageList([]))
  }, [fromProvince, toProvince])

  useEffect(() => {
    if (errors.apiError?.message === "Sefer bulunamadı") {
      dispatch(setFilteredVoyageList([]));
    } else {
    }
  }, [errors])


  useEffect(() => {
    let filteredData = locationList.filter((item: any) => item.name !== fromProvince)
    setFilteredLocationList([...filteredData]);
  }, [fromProvince])

  function onSubmit(data: Values) {
    let date = new Date();
    let jsonDate = JSON.stringify(date);
    console.log(jsonDate);

    let newDateFormat = jsonDate.slice(1, 11).split("-").reverse().join("-")
    let newTimeFormat = jsonDate.slice(12, 17);

    let dat = {
      from: data.from, to: data.to, day: newDateFormat, time: newTimeFormat
    };
    setError('apiError', { message: "" });
    dispatch(setSelectedVoyage(""));
    return buyTicketService.filter(dat)
      .then((res: any) => {
        console.log(res);
        dispatch(setFilteredVoyageList([...res.data.data]))
      })
      .catch((error: any) => {
        setError('apiError', { message: error.response.data.message });
      });
  }

  return (
    <Formik
      initialValues={{ from: "", to: "", day: "", time: "" }}
      onSubmit={(values: Values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {formik => {
        const { touched, isValid, values, handleChange, handleSubmit } = formik
        return (
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
                className="btn btn-sm py-3 px-4 filter-voyage">
                {formState.isSubmitting &&
                  <span className="spinner-border spinner-border-sm mr-1"></span>}
                Filtrele
              </button>
            </div>
          </Form>
        )
      }
      }
    </Formik>
  )
}

export default FilterVoyage