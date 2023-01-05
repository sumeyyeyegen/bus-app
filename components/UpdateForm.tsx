import React, { SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Form, Formik } from 'formik';
import { FormItem } from './FormItem';
import { setSelectedBrand, fetchModelById, setSelectedModel, setSelectedProp, setSelectedType, setBusInsertRes, setEdit, setSeatNumber, setBusUpdateRes, setSeats } from '../redux/reducers/BusReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { busService } from '../services/bus.service';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Router, { useRouter } from 'next/router';
import Alert from '../helpers/Alert';
import Graph from './SeatArrangement/Graph/graph';

interface Values {
  plate_number: string,
  model_id: number | string,
  number_of_seats: number | string,
  type: number | string,
  properties: Array<any>
}

const UpdateForm = () => {

  const [selectedPropertiesList, setSelectedPropertiesList] = React.useState<number[]>([]);
  const { selectedBrand, selectedModel, selectedType, brandList, propList, typeList, modelList, seatNumber, busUpdateRes, plateNumber, seats } = useAppSelector((state: any) => state.bus)

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChangeBrand = (event: SelectChangeEvent) => {
    // router.push(`/?id=${event.target.value}`)
    event && event.target.value &&
      dispatch(setSelectedBrand(event?.target?.value));
  };

  const handleChangeModel = (event: SelectChangeEvent) => {
    event && event.target.value &&
      dispatch(setSelectedModel(event?.target?.value));
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    event && event.target.value &&
      dispatch(setSelectedType(event?.target?.value));
  };

  const handleChangeProp = (event: any) => {
    event && event.target.value &&
      setSelectedPropertiesList(event?.target?.value)
  };

  function handleSeatNumber(e: any) {
    dispatch(setSeatNumber(e.target.value))
  }


  var regex = /^(0[1-9]|[1-7][0-9]|8[01])((\s?[a-zA-Z]\s?)(\d{4,5})|(\s?[a-zA-Z]{2}\s?)(\d{3,4})|(\s?[a-zA-Z]{3}\s?)(\d{2,3}))$/;

  const validationSchema = Yup.object().shape({
    plate_number: Yup.string()
      .required("Plaka zorunludur").matches(regex, "Uygun bir plaka giriniz"),
    model_id: Yup.number()
      .required("Model seçiniz"),
    number_of_seats: Yup.number()
      .required("Koltuk sayısı giriniz"),
    type: Yup.number()
      .required("Zorunlu alan"),
    properties: Yup.array()
      .required("Özellik seçiniz")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: Values) {
    let dat = { plate_number: data.plate_number, model_id: data.model_id, number_of_seats: data.number_of_seats, type: data.type, properties: data.properties };
    return busService.updateBus(dat)
      .then((res: any) => {
        dispatch(setBusUpdateRes(res.data));
      })
      .catch((error: any) => {
        setError('apiError', { message: error.message });
      });
  }

  useEffect(() => {
    if (selectedBrand !== undefined) {
      dispatch(fetchModelById(selectedBrand))
    }
  }, [selectedBrand])

  useEffect(() => {
    if (busUpdateRes.message === "Bus created") {
      dispatch(setEdit(true));
      Alert().Success("Güncelleme başarılı")
    }
    dispatch(setBusUpdateRes(""))
  }, [busUpdateRes])


  function increment() {
    dispatch(setSeats([...seats, { id: seats.length, value: seats.length + 1, height: 3, width: 3, free: 0}]));

  }
  function decrement() {
    let filteredData = seats.filter((item: any) => item.id !== seats.length - 1);
    dispatch(setSeats([...filteredData]));
  }

  return (
    <Formik
      initialValues={{ plate_number: plateNumber, model_id: selectedModel, number_of_seats: seatNumber, type: selectedType, properties: [...selectedPropertiesList] }}
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
                    <FormItem errors={errors.plate_number} isValid={isValid} touched={touched.plate_number} formik={formik.errors.plate_number} type="plate_number" values={values.plate_number} handleChange={handleChange} text="Plaka" />
                  </div>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Marka</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={selectedBrand}
                        label="Marka"
                        {...register("brand")}
                        onChange={(e) => handleChangeBrand(e)}
                      >
                        {
                          brandList.length > 0 ? brandList.map((brand: any) => {
                            return <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Model</InputLabel>
                      <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={selectedModel}
                        label="Marka"
                        {...register("model_id")}
                        onChange={(e) => { handleChange(e); handleChangeModel(e) }}
                      >
                        {
                          modelList.length > 0 ? modelList.map((model: any) => {
                            return <MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <FormItem errors={errors.number_of_seats} isValid={isValid} touched={touched.number_of_seats} formik={formik.errors.number_of_seats} type="number_of_seats" values={values.number_of_seats} handleChange={(e: any) => { handleChange(e); handleSeatNumber(e) }} text="Koltuk Sayısı" />
                  </div>
                  <div className="form-group">
                    <FormControl fullWidth>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={selectedType}
                        label="Tip"
                        {...register("type")}
                        onChange={(e) => { handleChange(e); handleChangeType(e) }}
                      >
                        {
                          typeList.length > 0 ? typeList.map((type: any) => {
                            return <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Özellik</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={selectedPropertiesList}
                        label="Özellik"
                        multiple={true}
                        {...register("properties")}
                        onChange={(e) => { handleChange(e); handleChangeProp(e) }}
                      >
                        {
                          propList.length > 0 ? propList.map((prop: any) => {
                            return <MenuItem key={prop.id} value={prop.id}>{prop.name}</MenuItem>
                          }) : ""
                        }

                      </Select>
                    </FormControl>
                  </div>



                  {
                    <button
                      // disabled={formState.isSubmitting}
                      type="submit"
                      className="btn btn-primary">
                      {formState.isSubmitting &&
                        <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Düzenle
                    </button>
                  }
                </Form>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <button onClick={() => increment()}>+</button>
              <button onClick={() => decrement()}>-</button>
              <Graph seatNumber={seatNumber} />
            </div>
          </div>
        )
      }
      }
    </Formik>
  )
}

export default UpdateForm