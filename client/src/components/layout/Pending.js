import React, { useContext, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import AuthContext from '../../context/auth/authContext'
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";


const Pending = () => {
    const usersContext = useContext(UsersContext)
    const authContext = useContext(AuthContext)
    const { state, getPending, addFriend, removeFromPending } = usersContext
    const { user } = authContext

    useEffect(() => {
        getPending(user._id)
        // eslint-disable-next-line
    }, [])

    const handleClick = (friendID) => {
        const currentUserID = user._id
        removeFromPending(currentUserID, friendID)
        addFriend(currentUserID, friendID)
    }

    return (
        <div>
            {state.pendingFriends.length ? 
                <div className="pendingFriends posts" ><h3>Pending friend requests</h3>

                    {state.pendingFriends && state.pendingFriends.map(friend => (
                        <div key={friend._id} className="card bg-light">
                            <div className='friendCard'>
                                <div className='profile-pic-container'>
                                    {(friend && friend.profilePhoto) ? <img className='small-profile-pic' src={friend.profilePhoto.url} alt='small profile pic'/> : <Avatar />}
                                </div>
                                <div>
                                    <h3 className="text-primary text-left">
                                        <Link to={`/${friend._id}`}>
                                            {friend.info ? friend.info.name : friend.name}
                                        </Link>
                                    </h3>
                                    <h4>{friend.info ? friend.info.email : friend.email}</h4>
                                </div>
                                <button className='btn btn-sm btn-success' onClick={() => handleClick(friend._id)}>Approve</button>
                            </div>
                        </div>
                    ))}
                </div>
            : ''
            }
        </div>
    )
}

export default Pending
