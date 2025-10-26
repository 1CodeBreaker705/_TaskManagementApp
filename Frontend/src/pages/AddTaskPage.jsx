import React, {  useState } from 'react'
import * as yup from 'yup'
import { taskCategories,statusList,priorityList } from '../utils/constant'
import { toast } from 'react-toastify'
import { Formik,Form, Field, ErrorMessage } from 'formik'
import CustomLoaderButton from '../components/CustomLoaderButton'
import { axiosClient } from '../utils/axiosClient'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '../context/MainContext'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const AddTaskPage = () => {

  const navigate=useNavigate()
  const {fetchAllTasks}=useMainContext()
  const [loading,setLoading]=useState(false)

  const catogories=Object.keys(taskCategories)
  
  const initialValues={
      title:"",
      description:"",
      category:"",
      status:"",
      priority:"",
      dueDate:""
  }
  
  const validationSchema=yup.object({
      title:yup.string().required("Title is required"),
      description:yup.string().required("Description is required"),
      category:yup.string().required("Category is required").oneOf(catogories,"Choose valid category"),
      status:yup.string().required("Status is required").oneOf(statusList,"Choose valid status"),
      dueDate: yup.date().nullable().transform((curr, orig) => (orig === "" ? null : curr)).typeError("Invalid date"),
      priority:yup.string().required("Priority is required").oneOf(priorityList,"Choose valid priority")
  })

  const onSubmitHandler=async(values,helpers)=>{
      try {
        setLoading(true)
      
        const response=await axiosClient.post('/add-task',values,{
          headers:{
            user:localStorage.getItem('user') || ''
          }
        })
        const data=response.data
        toast.success(data.message)
        await fetchAllTasks()
        navigate('/dashboard')
        helpers.resetForm()
      } catch (error) {
        toast.error(error.response.data.error || error.message)
      }finally{
         setLoading(false)
      }
  }

  return (
    <>
     <Formik
     initialValues={initialValues}
     validationSchema={validationSchema}
     onSubmit={onSubmitHandler}
     >
      {({values,setFieldValue})=>(
      <Form className='bg-indigo-500 shadow-lg mx-auto my-10 py-10 px-3 lg:px-10 lg:w-[70%] rounded-xl '>
       <div className='bg-white px-10 rounded-xl'>
        <div className='py-10 px-2'>
          <div className='mb-3'>
          <label htmlFor="">Due Date (Optional)</label>
          <Field name='dueDate' type="date" className="w-full py-3 px-4 border rounded" placeholder="Select Due Date"  />
          <ErrorMessage name='dueDate'  className='text-red-500 text-normal' component={'p'}/>
         </div>
         <div className='mb-3'>
          <label htmlFor="">Title</label>
          <Field name='title' type="text" className="w-full py-3 px-4 border rounded" placeholder='Enter Task Title' />
          <ErrorMessage name='title'  className='text-red-500 text-normal' component={'p'}/>
         </div>
         <div className="mb-3">
            <label htmlFor="">Description</label>
            <ReactQuill theme="snow" value={values.description} onChange={(val) => setFieldValue("description", val)} className="border rounded bg-white"/>
            <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
        </div>
         <div className='mb-3'>
          <label htmlFor="">Categories</label>
          <Field name='category' as='select' className="w-full py-3 px-4 border rounded">
               <option value="">-----select-----</option>
               {
                catogories.map((cur,i)=>{
                  return <option key={i} value={cur}>{cur}</option>
                })
               }
          </Field>
          <ErrorMessage name='category'  className='text-red-500 text-normal' component={'p'}/>
          </div>
          <div className="mb-3">
            <label htmlFor="">Status</label>
            <Field name='status' as='select' className="w-full py-3 px-4 border rounded">
               <option value="">-----select-----</option>
               {
                statusList.map((cur,i)=>{
                  return <option key={i} value={cur}>{cur}</option>
                })
               }
            </Field>
            <ErrorMessage name='status'  className='text-red-500 text-normal' component={'p'}/>
          </div>
          <div className="mb-3">
            <label htmlFor="">Priority</label>
            <Field name='priority' as='select' className="w-full py-3 px-4 border rounded">
               <option value="">-----select-----</option>
               {
                priorityList.map((cur,i)=>{
                  return <option key={i} value={cur}>{cur}</option>
                })
               }
            </Field>
            <ErrorMessage name='priority'  className='text-red-500 text-normal' component={'p'}/>
          </div>
          
          <div className="mt-6">
            <CustomLoaderButton isLoading={loading} text="Add Task"/> 
          </div>
         </div>
        </div>
      </Form>
      )}
     </Formik>
    </>
  )
}

export default AddTaskPage
