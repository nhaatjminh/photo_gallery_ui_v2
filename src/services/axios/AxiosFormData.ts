import axios, { AxiosError, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_API_URL + 'media/'

const axiosFormData = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'multipart/form-data'
  }
})

axiosFormData.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    return res
  },
  (err: AxiosError) => {
    throw err
  }
)

export default axiosFormData
