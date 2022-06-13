import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import ProfileContext from '../../context/profile/profileContext'

const PhotoItem = ({photo, getPhotoAlbum}) => {
    let { id } = useParams();
    const { deletePhoto } = useContext(UsersContext)
    const { user } = useContext(AuthContext);
    const { loadProfile } = useContext(ProfileContext);

    useEffect(() => {
        id && loadProfile(id)
        // eslint-disable-next-line
    }, [])

    const handleDelete = async (userID, photoID) => {
        await deletePhoto(userID, photoID)
        getPhotoAlbum(user._id)
    }

    return (
        <div className="photoItem">
            {photo && <img src={photo.url} alt='mini' /> }
            {photo && <h3>{photo.description}</h3> }

            {photo && user && user._id === photo.owner &&
            <button onClick={() => handleDelete(user._id, photo.public_id)}>X</button>
            }
        </div>
    )
}

export default PhotoItem
