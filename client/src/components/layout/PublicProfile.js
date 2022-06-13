import React, { useContext, useEffect } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import Avatar from '../../images/avatar.png'
import BlankBG from '../../images/blankbg.png'

const PublicProfile = ({ profileID }) => {
    const { getProfileInfo, profileInfo, backgroundImage, getBackgroundPhoto } = useContext(ProfileContext)

    useEffect(() => {
        getProfileInfo(profileID);
        getBackgroundPhoto(profileID);
        // eslint-disable-next-line
    }, [])

    const photo = profileInfo && profileInfo.profilePhoto ? profileInfo.profilePhoto.url : Avatar
    const bgPhoto = backgroundImage ? backgroundImage.url : BlankBG

    return (
        <div className='banner'>
            <div className='banner-container'>
            <img src={bgPhoto} className='bg-pic' alt='background'/>
            
            <div className='profile'>
                <div className='profile-pic-container'>
                    <img src={photo} className='profile-pic' alt='profile'/>
                </div>
                
                <div className="profile-info"   >
                    <h1>{profileInfo.info ? profileInfo.info.name : profileInfo.name}</h1>
                    <h4>{profileInfo.email}</h4>
                    <h4>{profileInfo.location}</h4>
                </div>
            </div>
            </div>
        </div>

    )
}

export default PublicProfile
