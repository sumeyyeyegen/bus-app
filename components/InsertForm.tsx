import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Form, Formik } from 'formik';
import { FormItem } from './FormItem';
import { setSelectedBrand, fetchModelById, setSelectedModel, setSelectedType, setBusInsertRes, setEdit, setSeatNumber, setPlateNumber } from '../redux/reducers/BusReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { busService } from '../services/bus.service';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';
import Alert from '../helpers/Alert';

interface Values {
  plate_number: string,
  model_id: number | string,
  number_of_seats: number | string,
  type: number | string,
  properties: Array<any>
}

const InsertForm = () => {

  const [selectedPropertiesList, setSelectedPropertiesList] = React.useState<number[]>([]);
  const { selectedBrand, selectedModel, selectedType, brandList, propList, typeList, modelList, selectedProp, busInsertRes, edit, plateNumber } = useAppSelector((state: any) => state.bus)

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlePlateNumber = (event: SelectChangeEvent) => {
    event && event.target.value &&
      dispatch(setPlateNumber(event?.target?.value));
  }

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
    console.log("data", data)
    let dat = { plate_number: data.plate_number, model_id: data.model_id, number_of_seats: data.number_of_seats, type: data.type, properties: data.properties };
    return busService.insertBus(dat)
      .then((res: any) => {
        dispatch(setBusInsertRes(res.data));
      })
      .catch((error: any) => {
        console.log(error)
        error.response.data.message === "ERROR: duplicate key value violates unique constraint \"idx_buses_plate_number\" (SQLSTATE 23505)" && Alert().Error("Bu plakaya ait bir araç bulunmaktadır")
      });
  }

  useEffect(() => {
    if (selectedBrand !== undefined) {
      dispatch(fetchModelById(selectedBrand))
    }
  }, [selectedBrand])



  useEffect(() => {
    console.log(busInsertRes)
    if (busInsertRes.message === "Bus successfully created") {
      dispatch(setEdit(true));
      Alert().Success("Ekleme işlemi başarılı");

    } else if (busInsertRes.message === "") {

    }
    dispatch(setBusInsertRes(""))
  }, [busInsertRes])


  return (
    <Formik
      initialValues={{ plate_number: '', model_id: '', number_of_seats: "", type: "", properties: [] }}
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
                    <FormItem errors={errors.plate_number} isValid={isValid} touched={touched.plate_number} formik={formik.errors.plate_number} type="plate_number" values={values.plate_number} handleChange={(e: any) => { handleChange(e); handlePlateNumber(e) }} text="Plaka" />
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
                        onChange={(e) => { handleChangeBrand(e) }}
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
                            return <MenuItem key={model.id} value={model.id}>{model.value}</MenuItem>
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
                      <InputLabel id="demo-simple-select-label">Tip</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required={true}
                        value={selectedType}
                        label="Tip"
                        {...register("type")}
                        onChange={(e) => { handleChange(e); handleChangeType(e) }}
                      >
                        {console.log(typeList)
                        }
                        {
                          typeList.length > 0 ? typeList.map((type: any) => {
                            return <MenuItem key={type.id} value={type.id}>{type.value}</MenuItem>
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
                            return <MenuItem key={prop.id} value={prop.id}>{prop.value}</MenuItem>
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
                      Kaydet
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

export default InsertForm