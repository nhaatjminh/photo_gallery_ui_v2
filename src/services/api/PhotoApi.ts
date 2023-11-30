import axiosBase from '../axios/AxiosBase'
import axiosFormData from '../axios/AxiosFormData'

export interface IEditPhoto {
  _id: string
  name: string
  description: string
}

const photosAPI = {
  getPhotos: async ({ offset, limit }: { offset: number; limit: number }) => {
    const result = await axiosBase.get('photos', {
      params: {
        offset,
        limit
      }
    })
    return result.data
  },
  editPhoto: async (params: IEditPhoto) => {
    const result = await axiosBase.put(`photos/${params._id}`, params)
    return result.data
  },
  uploadPhotos: async (params: FormData) => {
    const result = await axiosFormData.post(`photos`, params)
    return result.data
  }
}

export default photosAPI
