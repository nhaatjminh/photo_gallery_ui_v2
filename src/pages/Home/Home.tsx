import { useEffect, useRef, useState } from 'react'
import Photo, { IPhoto } from '~/components/Photo/Photo'
import photosAPI from '~/services/api/PhotoApi'
import './Home.scss'
import ModalPhoto from '~/components/common/ModalPhoto/ModalPhoto'
import Loader from '~/components/common/Loader/Loader'
import ModalUpload from '~/components/common/ModalUpload/ModalUpload'
import Button from '~/components/common/Button/Button'
import { useToast } from '~/components/common/Toast/ToastContext'

const limit = 12

const optionsObserver = {
  rootMargin: '0px',
  threshold: 0.5
}

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [currentPhoto, setCurrentPhoto] = useState<IPhoto | null>(null)
  const [showPhoto, setIsShowPhoto] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const fetchMoreData = async () => {
    setLoading(true)
    const data = await photosAPI.getPhotos({ offset: photos.length, limit: limit })
    setLoading(false)
    if (data.result) {
      setPhotos((pre) => [...pre, ...data.result])
      if (data.result.length < limit) {
        setHasMore(false)
      }
    }
    return data.result
  }

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const data = await photosAPI.getPhotos({ offset: 0, limit: limit })
      setLoading(false)
      if (data.result) {
        setPhotos(data.result)
        if (data.result.legnth < limit) setHasMore(false)
      }
    }
    fetchApi()
  }, [])

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreData()
    }
  }

  useEffect(() => {
    if (!photos.length || !hasMore) return

    const observer = new IntersectionObserver(onIntersection, optionsObserver)
    const observeElement = document.querySelector(`#p-${photos[photos.length - 5]?._id}`)

    if (observer && observeElement) {
      observer.observe(observeElement)
    }

    return () => {
      if (observer) observer.disconnect()
    }
  }, [photos, showPhoto, showUploadModal])

  const ListPhoto = () => {
    return photos.map((photo, index) => (
      <Photo
        onClick={(photo) => {
          setCurrentPhoto(photo)
          setIsShowPhoto(true)
        }}
        index={index}
        key={photo._id}
        _id={photo._id}
        name={photo.name}
        description={photo.description}
        image={photo.image}
        thumbnail={photo.thumbnail}
      />
    ))
  }

  const handleOnClickNext = async (index: number) => {
    if (index == photos.length - 1) {
      if (hasMore) {
        const res: IPhoto[] = await fetchMoreData()
        if (res.length) {
          setCurrentPhoto({ ...res[0], index: index + 1 })
          return
        }
      } else return
    }
    setCurrentPhoto({ ...photos[index + 1], index: index + 1 })
  }

  const handleOnClickPrev = (index: number) => {
    if (index == 0) return
    setCurrentPhoto({ ...photos[index - 1], index: index - 1 })
  }

  const handleOnUpdatePhotoSuccess = (photo: IPhoto) => {
    const newPhotos = [...photos]
    if (photo.index !== undefined) newPhotos[photo.index] = photo
    setPhotos(newPhotos)
    setCurrentPhoto(photo)
    toast?.open('Update successfully!')
  }

  const handleOnUploadSuccess = (newPhotos: IPhoto[]) => {
    // setHasMore(true)
    const newListPhoto = [...newPhotos.reverse(), ...photos]
    setPhotos(newListPhoto)
    toast?.open('Upload successfully!')
  }

  return (
    <>
      <div className='home p-5'>
        <div className='header'>
          <h2 className='text-red-500 text-center mb-5'>Photo Gallery</h2>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setShowUploadModal(true)
            }}
          >
            Add Photos
          </Button>
        </div>
        <div ref={ref} className='home grid wide container'>
          <div className='row'>
            <ListPhoto />
          </div>
          {loading && <Loader />}
        </div>
      </div>

      {showPhoto && currentPhoto !== null ? (
        <ModalPhoto
          isShow={true}
          index={currentPhoto.index}
          setIsShow={setIsShowPhoto}
          _id={currentPhoto._id}
          name={currentPhoto.name}
          description={currentPhoto.description}
          thumbnail={currentPhoto.thumbnail}
          image={currentPhoto.image}
          onClickNext={handleOnClickNext}
          onClickPrev={handleOnClickPrev}
          onUpdateSuccess={handleOnUpdatePhotoSuccess}
        />
      ) : null}

      {showUploadModal && (
        <ModalUpload isShow={showUploadModal} setIsShow={setShowUploadModal} onUploadSuccess={handleOnUploadSuccess} />
      )}
    </>
  )
}
