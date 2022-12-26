import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import { useForm } from 'react-hook-form';
import { expeditionService } from '../services/expedition.service';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setDateExp, setExpeditionInsertRes, setFee, setFromProvince, setSelectedBus, setToProvince } from '../redux/reducers/ExpeditionReducer';
import { FormItem } from './FormItem';

import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers';

interface Values {
  bus: Object,
  fee: number | string,
  from: number | string,
  to: number | string,
  date: Dayjs | null
}

const ExpeditionDef = () => {
  const dispatch = useAppDispatch();
  const { selectedBus, fee, fromProvince, toProvince, dateExp } = useAppSelector((state: any) => state.expedition)
  const [busList, setBusList] = useState<{ id: number, plateNumber: String }[]>([
    { id: 1, plateNumber: "34 DR 4000" },
    { id: 2, plateNumber: "34 TA 4000" },
    { id: 3, plateNumber: "35 ECE 4000" }
  ])

  const [provinceList, setProvinceList] = useState<{ id: number, name: String }[]>([
    { id: 1, name: "İzmir" },
    { id: 2, name: "Denizli" },
    { id: 3, name: "İstanbul" },
    { id: 3, name: "Ankara" },
  ])

  const validationSchema = Yup.object().shape({
    model_id: Yup.number()
      .required("Model seçiniz"),
    number_of_seats: Yup.number()
      .required("Koltuk sayısı giriniz"),
    type: Yup.number()
      .required("Zorunlu alan"),
    properties: Yup.array()
      .required("Özellik seçiniz")
  });

  const handleChangeBus = (e: any) => {
    e && e.target.value &&
      dispatch(setSelectedBus(e?.target?.value));
  }
  const handleFee = (e: any) => {
    e && e.target.value &&
      dispatch(setFee(e?.target?.value));
  }

  const handleFromProvince = (e: any) => {
    e && e.target.value &&
      dispatch(setFromProvince(e?.target?.value));
  }
  const handleToProvince = (e: any) => {
    e && e.target.value &&
      dispatch(setToProvince(e?.target?.value));
  }
  const handleDateExp = (e: any) => {
    e && e.target.value &&
      dispatch(setDateExp(e?.target?.value));
  }
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: Values) {
    console.log("data", data)
    let dat = { bus: data.bus, fee: data.fee, from: data.from, to: data.to, date: data.date };
    return expeditionService.insertExpedition(dat)
      .then((res: any) => {
        dispatch(setExpeditionInsertRes(res.data));
      })
      .catch((error: any) => {
        setError('apiError', { message: error.message });
      });
  }


  return (
    <Formik
      initialValues={{ bus: {}, fee: '', from: "", to: "", date: null }}
      onSubmit={(values: Values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {formik => {
        const { touched, isValid, values, handleChange, handleSubmit } = formik
        return (
          <div className="row">
            <div className="col-12 col-md-5">
              <div>
                <Form>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Otobüs Seç</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={selectedBus}
                        label="Otobüs"
                        {...register("bus")}
                        onChange={(e) => { handleChange(e); handleChangeBus(e) }}
                      >
                        {
                          busList.length > 0 ? busList.map((bus: any) => {
                            return <MenuItem key={bus.id} value={bus.id}>{bus.plate_number}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <FormItem errors={errors.fee} isValid={isValid} touched={touched.fee} formik={formik.errors.fee} type="fee" values={values.fee} handleChange={(e: any) => { handleChange(e); handleFee(e) }} text="Koltuk Ücreti" />
                  </div>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Nereden</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={fromProvince}
                        label="Nereden"
                        {...register("from")}
                        onChange={(e) => handleFromProvince(e)}
                      >
                        {
                          provinceList.length > 0 ? provinceList.map((province: any) => {
                            return <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Nereye</InputLabel>
                      <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={toProvince}
                        label="Nereye"
                        {...register("to")}
                        onChange={(e) => { handleChange(e); handleToProvince(e) }}
                      >
                        {
                          provinceList.length > 0 ? provinceList.map((province: any) => {
                            return <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Tarih"
                        value={dateExp}
                        onChange={(newValue) => {
                          dispatch(setDateExp(newValue));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>


                  {
                    <button
                      // disabled={formState.isSubmitting}
                      type="submit"
                      className="btn btn-primary">
                      {formState.isSubmitting &&
                        <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Ekle
                    </button>
                  }
                </Form>
              </div>
            </div>
          </div>
        )
      }
      }
    </Formik>
  )
}

export default ExpeditionDef