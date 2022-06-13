import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import Avatar from '../../images/avatar.png'
import BlankBG from '../../images/blankbg.png'

const Profile = () => {
    const navigate = useNavigate();
    const { getProfileInfo, profileInfo, backgroundImage, getBackgroundPhoto, profilePhoto, getProfilePhoto } = useContext(UserContext)
    
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getProfileInfo(user._id);
        getBackgroundPhoto(user._id);
        getProfilePhoto(user._id)
        // eslint-disable-next-line
    }, [])

    const photo = profilePhoto ? profilePhoto.url : Avatar
    const bgPhoto = backgroundImage ? backgroundImage.url : BlankBG

    // console.log('checkloops prof.info=', profileInfo)
    return (
        <div className='banner'>
            <div className='banner-container'>
                <img src={bgPhoto} className='bg-pic' alt='background'/>
                     
                <button className='btn-sm edit-bg-button' onClick={() => navigate('/edit/background-image')}>Edit background</button>
                
                <div className='profile'>
                    <div className='profile-pic-container'>
                        <img src={photo} className='profile-pic' alt='profile'/>
                        <button className='btn-sm editpic-button' onClick={() => navigate('/edit/profilepic')}>Edit</button>
                    </div>
                    
                    <div className="profile-info">
                        <h1>{profileInfo ? profileInfo.name : user.name}</h1>
                        <h4>{profileInfo ? profileInfo.email : user.email}</h4>
                        <h4>{profileInfo ? profileInfo.location : ''}</h4>
                        
                        <button className='btn-sm edit-button' onClick={() => navigate('/edit/profile')}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
