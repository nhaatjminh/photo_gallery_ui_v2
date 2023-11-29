import axios, { AxiosError, AxiosResponse } from 'axios'

const baseURL = 'http://localhost:5001/media/'

const axiosBase = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json'
  }
})

axiosBase.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    return res
  },
  (err: AxiosError) => {
    throw err
  }
)

export default axiosBase
