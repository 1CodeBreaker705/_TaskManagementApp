import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoaderComponent from '../components/LoaderComponent'
import { useMainContext } from '../context/MainContext'

const ProtectedLayout = () => {

  const {user}=useMainContext()
  const navigate=useNavigate()

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
     if (user === undefined) return; 
     if(!user){
      navigate('/login')
    }else{
      setLoading(false)
    }
  },[user,navigate])

  if(loading){
    return <LoaderComponent/>
  }

  return (
    <>
     <Outlet/>
    </>
  )
}

export default ProtectedLayout
