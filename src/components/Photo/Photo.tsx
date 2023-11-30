import React from 'react'
import './Photo.scss'

export interface IPhoto {
  _id: string
  name: string
  description: string
  image: string
  thumbnail: string
  index?: number
}

const Photo: React.FC<IPhoto & { onClick: (photo: IPhoto) => void }> = ({
  _id,
  name,
  description,
  image,
  thumbnail,
  index,
  onClick
}) => {
  return (
    <div id={`p-${_id}`} className='col l-3 m-4 c-6'>
      <div className='photo'>
        <div className='photo__img'>
          <img
            src={thumbnail}
            onClick={(e) => {
              e.stopPropagation()
              onClick({ _id, name, description, image, thumbnail, index })
            }}
          />
        </div>
        <div className='photo__content'>
          <p className='photo__content__title'>{name}</p>
          <p className='photo__content__description'>{description}&nbsp;</p>
        </div>
        {/* <Card key={_id} className='w-100'>
        <Card.Img className='h-80 w-100 object-contain' variant='top' src={thumbnail} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card> */}
      </div>
    </div>
  )
}

export default Photo
