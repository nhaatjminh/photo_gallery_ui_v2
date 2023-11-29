import axiosBase from '../axios/AxiosBase'

const photosAPI = {
  getPhotos: async ({ offset, limit }: { offset: number; limit: number }) => {
    const result = await axiosBase.get('photos', {
      params: {
        offset,
        limit
      }
    })
    return result.data
  }
}

export default photosAPI
