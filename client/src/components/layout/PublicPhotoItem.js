import React from 'react'

const PhotoItem = ({photo}) => {
    return (
        <div className='publicPhotoItem'>
            <img src={photo.url} alt='mini' />
            <h3>{photo.description}</h3>
        </div>
    )
}

export default PhotoItem
