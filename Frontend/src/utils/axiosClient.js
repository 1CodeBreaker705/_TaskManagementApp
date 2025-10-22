import axios from 'axios'

export const axiosClient=axios.create({
  baseURL:'https://taskmanagementapp-orr1.onrender.com/api/v1'
})
