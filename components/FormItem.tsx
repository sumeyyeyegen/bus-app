import { Field } from 'formik'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface formItemPropTypes {
  // register: Function,
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
  isValid: Boolean,
  touched: Boolean | undefined,
  formik: String | undefined,
  type: String,
  handleChange: Function,
  values: String | number | undefined,
  text: String
}

export { FormItem };

const FormItem = ({ errors, isValid, touched, formik, type, handleChange, values, text }:
  formItemPropTypes) => {
  return <div>
    <label className='text-capitalize' htmlFor={`${type}`}>{text}</label>
    <Field id={`${type}`} type="text" className={`form-control p-0 m-0 ${errors ? 'is-invalid' : ''}`} onChange={handleChange}
      value={values} />
    <div className={`invalid-feedback ${isValid !== true && touched && "d-block"}`}>{isValid !== true && touched ? <div>{formik}</div> : null}</div>
  </div>
}
