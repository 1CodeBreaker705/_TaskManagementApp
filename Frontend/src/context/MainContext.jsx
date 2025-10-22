import React, { createContext, useEffect, useState,useContext } from 'react'
import { axiosClient } from '../utils/axiosClient'
import LoaderComponent from '../components/LoaderComponent'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const mainContext=createContext()

export const useMainContext=()=>useContext(mainContext)

export const MainContextProvider = ({children}) => {

  const[loading,setLoading]=useState(false)
  const [user,setUser]=useState(null)
  const [tasks,setTasks]=useState([])
  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem("user")
    toast.success("Logout Sucessfully")
    navigate("/login")
    setUser(null)
  }

  const fetchAllTasks=async()=>{
     try {

      const response=await axiosClient.get('all-tasks',{
        headers:{
          user:localStorage.getItem('user')
        }
      })
      const data=response.data
      setTasks(data)
      
     } catch (error) {
      toast.error(error.response.data.error || error.message)
     }
  }

  const fetchProfile=async()=>{
    try {
      
      setLoading(true)

      const token=localStorage.getItem('user') || ''

      if(!token){
        return
      }
      
      const response = await axiosClient.get("/profile",{
        headers:{
          user:token
        }
      })

      const data=response.data
      setUser(data)

      await fetchAllTasks()

    } catch (error) {
        console.log(error)  
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
     fetchProfile()
  },[])

  if(loading){
    return <div className='min-h-screen flex items-center justify-center'>
      <LoaderComponent/>
    </div>
  }

  return (
    <>
    <mainContext.Provider value={{user,logoutHandler,fetchProfile,fetchAllTasks,tasks}}>
    {children}
    </mainContext.Provider>
    </>
  )
}


