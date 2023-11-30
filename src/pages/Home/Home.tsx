import React, { useEffect, useRef, useState } from 'react'
import Photo, { IPhoto } from '~/components/Photo/Photo'
import photosAPI from '~/services/api/PhotoApi'
import './Home.scss'
import ModalPhoto from '~/components/common/ModalPhoto/ModalPhoto'

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
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const fetchMoreData = async () => {
    const data = await photosAPI.getPhotos({ offset: page * limit, limit: limit })
    if (data.result) {
      setPhotos((pre) => [...pre, ...data.result])
      setPage((pre) => pre + 1)
      if (data.result.length < limit) {
        setHasMore(false)
      }
    }
  }

  useEffect(() => {
    const fetchApi = async () => {
      const data = await photosAPI.getPhotos({ offset: 0, limit: limit })
      if (data.result) {
        setPhotos(data.result)
        setPage((pre) => pre + 1)
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
    if (!photos.length) return

    const observer = new IntersectionObserver(onIntersection, optionsObserver)
    const observeElement = document.querySelector(`#p-${photos[photos.length - 5]?._id}`)

    if (observer && observeElement) {
      observer.observe(observeElement)
    }

    return () => {
      if (observer) observer.disconnect()
    }
  }, [photos])

  const ListPhoto = () => {
    return photos.map((photo) => (
      <Photo
        onClick={(photo) => {
          setCurrentPhoto(photo)
          setIsShowPhoto(true)
        }}
        key={photo._id}
        _id={photo._id}
        name={photo.name}
        description={photo.description}
        image={photo.image}
        thumbnail={photo.thumbnail}
      />
    ))
  }

  return (
    <>
      <div className='home p-5'>
        <h2 className='text-red-500 text-center mb-5'>Photo Gallery</h2>
        <div ref={ref} className='home grid wide container'>
          <div className='row'>
            <ListPhoto />
          </div>
          <div id='loadmore' className=''>
            ...Loadmore
          </div>
        </div>
      </div>

      {showPhoto && currentPhoto !== null ? (
        <ModalPhoto
          isShow={true}
          setIsShow={setIsShowPhoto}
          _id={currentPhoto._id}
          name={currentPhoto.name}
          description={currentPhoto.description}
          thumbnail={currentPhoto.thumbnail}
          image={currentPhoto.image}
        />
      ) : null}
    </>
  )
}
