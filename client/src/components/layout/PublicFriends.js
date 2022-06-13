import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import Spinner from '../layout/Spinner';

const Friends = ({ profileID }) => {

    const profileContext = useContext(ProfileContext)
    const { profileInfo, getFriends, state } = profileContext

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        profileID && getFriends(profileID)
        setLoading(false)
        // eslint-disable-next-line
    }, [])

    const changePublicPage = (id) => {
        getFriends(id)
    }

    if (loading) {
        return <Spinner />
    } else {
    return (
        <div className='post'>
            {state.allFriends && 
            <div><h2>{profileInfo.info?.name || profileInfo.name}'s friends:</h2>
                {state.allFriends && state.allFriends.map(friend => (
                    <div key={friend._id} className="card bg-light">
                        <div className='friendCard'>
                            <div className='profile-pic-container'>
                                {friend && friend.profilePhoto ? <img className='small-profile-pic' src={friend.profilePhoto.url} alt='profilepic' /> : <Avatar />}
                            </div>
                            <div>
                                <h3 className="text-primary text-left">
                                    <Link to={`/${friend._id}`} onClick={() => changePublicPage(friend._id)}>
                                        {friend.info ? friend.info.name : friend.name}
                                    </Link>
                                </h3>
                                <h4>{friend.info ? friend.info.email : friend.email}</h4>
                            </div>
                        </div>
                    </div>
                ))}

            </div>}
        </div>
    )
    }
}

export default Friends
