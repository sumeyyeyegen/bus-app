import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormItem } from '../components';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { authService } from '../services';
import Alert from '../helpers/Alert';
import Link from 'next/link';

interface Values {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}


const Register = () => {

  const router = useRouter();

  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("İsim alanı zorunludur"),
    last_name: Yup.string().required("Soyisim alanı zorunludur"),
    email: Yup.string().email("Geçerli bir email giriniz").matches(regex, "Geçerli bir email giriniz")
      .required("Email girilmesi zorunludur"),
    password: Yup.string()
      .required("Şifre girilmesi zorunludur")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: Values) {
    let dat = { first_name: data.first_name, last_name: data.last_name, email: data.email, password: data.password }
    return authService.register(dat)
      .then((res) => {
        res.data.status === "success" ? (Alert().Success("Başarılı bir şekildde kayıt gerçekleşti"), router.push("/login")) : ""
      })
      .catch((error: any) => {
        error.response.data.message === "ERROR: duplicate key value violates unique constraint \"idx_users_email\" (SQLSTATE 23505)" && (Alert().Error("Email adresi sistemimizde kayıtlı"), router.push("/login"))
        // setError('apiError', { message: error.message });
      });
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ first_name: "", last_name: "", email: '', password: '' }}
      onSubmit={(values: Values) => onSubmit(values)}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
        return (
          <div className="w-25 mx-auto mt-5">
            <div className="card">
              <div className="card-body">
                <Form >
                  <div className="form-group">
                    <FormItem errors={errors.first_name} isValid={isValid} touched={touched.first_name} formik={formik.errors.first_name} type="first_name" values={values.first_name} handleChange={handleChange} text="İsim" />
                  </div>
                  <div className="form-group">
                    <FormItem errors={errors.last_name} isValid={isValid} touched={touched.last_name} formik={formik.errors.last_name} type="last_name" values={values.last_name} handleChange={handleChange} text="Soyisim" />
                  </div>
                  <div className="form-group">
                    <FormItem errors={errors.email} isValid={isValid} touched={touched.email} formik={formik.errors.email} type="email" values={values.email} handleChange={handleChange} text="Email" />
                  </div>
                  <div className="form-group">
                    <FormItem errors={errors.password} isValid={isValid} touched={touched.password} formik={formik.errors.password} type="password" values={values.password} handleChange={handleChange} text="Şifre" />
                  </div>

                  <div className={`invalid-feedback ${errors.apiError?.message !== undefined && "d-block"}`}>
                    {errors?.apiError?.message !== undefined ? <>{errors.apiError?.message}</> : null}</div>


                  <button
                    disabled={formState.isSubmitting}
                    type="submit"
                    className="btn btn-primary">
                    {formState.isSubmitting &&
                      <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Kayıt Ol
                  </button>

                  <small className='d-block text-muted mt-3'>Kayıtlı bir hesabınız varsa <Link href="/login">Giriş Yap</Link></small>
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

export default Register