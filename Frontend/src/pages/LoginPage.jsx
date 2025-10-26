import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as yup from 'yup';
import { useState } from 'react';
import CustomLoaderButton from '../components/CustomLoaderButton';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';
import { axiosClient } from '../utils/axiosClient';
import { useMainContext } from '../context/MainContext';



const LoginPage = () => {

  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const {fetchProfile}=useMainContext()

  const onSubmitHandler=async(values,helpers)=>{
      try {
         setLoading(true)
         const response=await axiosClient.post('/login',values)
         const data=response.data
         toast.success(data.message)
         localStorage.setItem("user",data.token)
         helpers.resetForm()
         await fetchProfile()
         navigate("/dashboard")
         
      } catch (error) {
         toast.error(error?.response?.data?.error||error.message)
      }finally{
        setLoading(false)
      }
  }

const validationSchema=yup.object({
    email:yup.string().email("Enter valid Email").required("Email is required"),
    password:yup.string().required("Password is required")
})

const initialValues={
     email:'',
     password:''
}

const [isHidden,setIsHidden]=useState(true)

  return (
    <>
       <div className="min-h-[70vh] flex items-center justify-center flex-col">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
         <Form className='w-[96%] md:w-1/2 lg:w-1/3 my-10 bg-white shadow p-10 rounded-xl' action="">
            <div className='mb-3 flex items-center justify-center'>
               <Logo/>
            </div>
            <div className="mb-3">
                <label htmlFor='email'>Email</label>
                <Field name='email' id='email' type="email" className="w-full py-2 px-3 rounded border outline-none" placeholder='Enter Your Email' />
                <ErrorMessage name='email' component={'p'} className='text-red-500' />
            </div>
            <div className="mb-6">
                <label htmlFor='password'>Password</label>
                <div className="w-full py-2 px-3 rounded border flex ">
                <Field name='password' id='password' type={isHidden?"password":"text"} className="w-full outline-none" placeholder='Enter Your Password' />
                <button className='text-zinc-500 text-m font-bold cursor-pointer' type='button' onClick={()=>{setIsHidden(!isHidden)}} >
                  {isHidden?"Show":"Hide"}
                </button>
                </div>
                <ErrorMessage name='password' component={'p'} className='text-red-500' />
            </div>
           <div className="mb-4">
            <CustomLoaderButton isLoading={loading} text='Login'/>
           </div>
           <div className="mb-3">
             <p className="text-end">
               Don't have an account? <Link to={'/register'} className='font-medium text-blue-700'>Register</Link>
             </p>
           </div>
         </Form>
        </Formik>
      </div>
    </>
  )
}

export default LoginPage
