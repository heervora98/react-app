import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import loader from '../../assets/loder2.gif'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../navbar/nav'
import {
  getuser,
  selectUser,
  selectUserstatus,

} from '../counter/counterSlice'

const Productform = () => {
  const users = useSelector(selectUser)
  const status = useSelector(selectUserstatus)
  const [userData, setUserData] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getuser())
  }, [])

  useEffect(() => {
    console.log(users, '.......users');
    setUserData(users)
    console.log(status, "----status");
  }, [users, status]);

  console.log(userData, '......userData');

  //|-----------form---------->
  const initialValues = {
    username: '',
    email: ''
  }

  const onSubmit = values => {
    console.log(values, '.......values');
    // let mydata = []

    users.filter((user) => {
      if (user.username == values.username && user.email == values.email) {
        // mydata.push(user)
        navigate(`/`)
        localStorage.setItem('userLogin', JSON.stringify(user))

        const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 1000));
        toast.promise(
          functionThatReturnPromise,
          {
            pending: 'Loading...',
            success: 'The Form Was Submitted Successfully. 👌',
            error: 'Form Was Rejected 🤯'
          }
        )
      }
    })
    // console.log(mydata, '....mydata');
  }

  const validate = values => {
    let errors = {};

    if (!values.username) {
      errors.username = 'Required'
    }

    if (!values.email) {
      errors.email = 'Requierd'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (!values.password) {
      errors.password = 'Required'
    }
    return errors;
  }

  return (
    <>
    <Nav/>
      {
        status ? <img src={loader} className='loder-img2' /> :
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validate={validate}
            >
              <div className='container form-position'>
                <div className='row'>
                  <div className='col-12'>
                    <div className="form-out-side">
                      <h3 className='form-sighn-text mb-4'>Sighn In</h3>
                      <Form>
                        <div className='mb-3'>
                          <label name="username" className='form-label'>username</label>
                          <Field type="text" className='form-control' name='username' />
                          <ErrorMessage name='username' component={'div'} className="text-danger" />
                        </div>

                        <div className='mb-3'>
                          <label name="email" className='form-label'>Email</label>
                          <Field type="email" className='form-control' name='email' />
                          <ErrorMessage name='email' component={'div'} className="text-danger" />
                        </div>

                        <div className='mb-3'>
                          <label name="password" className='form-label'>password</label>
                          <Field type="password" className='form-control' name='password' />
                          <ErrorMessage name='password' component={'div'} className="text-danger" />
                        </div>

                        <button type='submit' className='form-submit-btn'>Submit</button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Formik>
          </div>
      }
    </>
  )
}

export default Productform
