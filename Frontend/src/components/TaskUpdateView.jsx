import React, {  useState } from 'react'
import * as yup from 'yup'
import { taskCategories,statusList } from '../utils/constant'
import { toast } from 'react-toastify'
import { Formik,Form, Field, ErrorMessage } from 'formik'
import CustomLoaderButton from '../components/CustomLoaderButton'
import { axiosClient } from '../utils/axiosClient'
import { useMainContext } from '../context/MainContext';

const TaskUpdateView = ({data,fetchData,close}) => {

  const {fetchAllTasks}=useMainContext()


  const [loading,setLoading]=useState(false)

  const categories=Object.keys(taskCategories)
  
  const initialValues={
      title: data.title || '',
      description:data.description|| '',
      category:data.category || '',
      status:data.status || ''
  }
  
  const validationSchema=yup.object({
      title:yup.string().required("Title is required"),
      description:yup.string().required("Description is required"),
      category:yup.string().required("Category is required").oneOf(categories,"Choose valid category"),
      status:yup.string().required("Status is required").oneOf(statusList,"Choose valid category")
  })

  const onSubmitHandler=async(values,helpers)=>{
      try {
        setLoading(true)
      
        const response=await axiosClient.put('/task/'+data._id,values,{
          headers:{
            user:localStorage.getItem('user') || ''
          }
        })
        const res=response.data
        toast.success(res.message)
        await fetchAllTasks()
        await fetchData()
        close()

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
      <Form className=' bg-white mx-auto  px-3 rounded-lg'>
        
        <div className='py-10 px-2'>
         <div className='mb-3'>
          <label htmlFor="">Title</label>
          <Field name='title' type="text" className="w-full py-3 px-4 border rounded" placeholder='Enter Task Title' />
          <ErrorMessage name='title'  className='text-red-500 text-normal' component={'p'}/>
         </div>
         <div className='mb-3'>
          <label htmlFor="">Description</label>
          <Field as='textarea' name='description' type="text" className="w-full py-3 px-4 border rounded" placeholder='Define Task' />
          <ErrorMessage name='description'  className='text-red-500 text-normal' component={'p'}/>
         </div>
         <div className='mb-3'>
          <label htmlFor="">Categories</label>
          <Field name='category' as='select' className="w-full py-3 px-4 border rounded">
               <option value="">-----select-----</option>
               {
                categories.map((cur,i)=>{
                  return <option key={i} value={cur}>{cur}</option>
                })
               }
          </Field>
          <ErrorMessage name='category'  className='text-red-500 text-normal' component={'p'}/>
          </div>
          <div className="mb-5">
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
            <CustomLoaderButton isLoading={loading} text="Update Task"/> 
          </div>
        </div>
      </Form>
     </Formik>
    </>
  )
}

export default TaskUpdateView
