import React, { useContext, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";

const Friends = () => {
    const usersContext = useContext(UsersContext)
    const authContext = useContext(AuthContext)
    const { state, getFriends, deleteFriend } = usersContext
    const { user } = authContext

    useEffect(() => {
        getFriends(user._id)
        // eslint-disable-next-line
    }, [])

    if(!state.allFriends.length) {
        return <div className="card "><h2>No friends yet</h2></div>
    }

    return (
        <div className='post'>
            {state.allFriends && 
            // <div><h2>Hello {user && user.info && user.info.name}, your friends:</h2>
            <div><h2>Hello {user.info?.name || user.name}, your friends:</h2>
                {state.allFriends && state.allFriends.map(friend => (
                    <div key={friend._id} className="card bg-light">
                        <div className='friendCard'>
                            <div className='profile-pic-container'>
                                {friend && friend.profilePhoto ? <img className='small-profile-pic' src={friend.profilePhoto.url} alt='profilepic' /> : <Avatar />}
                            </div>
                            <div>
                                <h3 className="text-primary text-left">
                                    <Link to={`/${friend._id}`}>
                                        {friend.info ? friend.info.name : friend.name}
                                    </Link>
                                </h3>
                                <h4>{friend.info ? friend.info.email : friend.email}</h4>
                            </div>
                            <button onClick={() => deleteFriend(user._id, friend._id)} className='btn btn-sm btn-danger'>X</button>
                        </div>
                    </div>
                ))}

            </div>}
        </div>
    )
}

export default Friends
